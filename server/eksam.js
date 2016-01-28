
Meteor.startup(function(){
    fs = Meteor.npmRequire('fs')
    path = Meteor.npmRequire('path')
    wrench = Meteor.npmRequire('wrench')
    exec = Meteor.npmRequire('child_process').execSync
    sys = Meteor.npmRequire('sys')
    rimraf = Meteor.npmRequire('rimraf')
    // fiber = Meteor.npmRequire('fibers')
});

Meteor.methods({
    toggleExam: function(){
         check(this.userId, String)
         var current = ExamCollection.findOne({type: "status"})
         if (!current)
            ExamCollection.insert({type: "status", open: true})
        else
            ExamCollection.update({type: "status"}, {$set: {open: !current.open}})
    },
    getGitLink: function(studentName) {
        check(studentName, String)
        if (!studentName) throw new Meteor.Error("Need student name")
        var examPath = "/srv/eksam/"
        console.log("Insert new document");
        var hash = ExamCollection.insert({
            studentName: studentName,
            createdAt: new Date(),
        })

        console.log("Go to raw repo");
        var rawPath = examPath + "toores/"
        var ls = fs.readdirSync(rawPath).filter(function(file) {
            return fs.statSync(path.join(rawPath, file)).isDirectory();
        });
        var secretRawRepo = path.join(rawPath, ls[0]) // the repo with all variants of exam exercises

        console.log("Copy repo temporarily");
        var temp = 'temp'
        var tempRepo = path.join(rawPath, temp, hash)
        try {
            wrench.copyDirSyncRecursive(secretRawRepo, tempRepo);
        } catch (e) {
            throw new Meteor.Error("chmod error", e)
        }

        console.log("Delete all but one file in each exercise type");
        var srcPath = path.join(tempRepo, "src")
        var allTypes = fs.readdirSync(srcPath).filter(function(file){
            var isDir = fs.statSync(path.join(srcPath, file)).isDirectory()
            var isVisible = file.charAt(0) !== '.'
            return isDir && isVisible
        })
        allTypes.forEach(function(dir){
            var fullPath = path.join(srcPath, dir)
            var files = fs.readdirSync(fullPath)
            files.splice(Math.floor(Math.random() * files.length), 1)
            files.forEach(function(file){
                fs.unlink(path.join(fullPath, file))
            })
        })
        var commitCmd = "cd "+tempRepo+" && git add --all && git commit -m \"ready to go\""
        exec(commitCmd, function(error, stdout, stderr){
            if (error) {
                console.log("================== COMMIT ERROR START ==================");
                console.log("HASH", hash);
                console.log("COMMAND", cloneCmd);
                console.log("ERROR",error);
                console.log("STDOUT",stdout);
                console.log("STDERR",stderr);
                console.log("=================== COMMIT ERROR END ===================");
            }
        })

        console.log("Create bare repo with random hash for student to clone");
        var studentsReposPath = path.join(examPath, 'tudeng')
        var cloneCmd = "cd " + studentsReposPath + " && git clone --bare " + tempRepo + " " + hash + ".git"
        exec(cloneCmd, function(error, stdout, stderr){
            if (error) {
                console.log("================== CLONE ERROR START ==================");
                console.log("HASH", hash);
                console.log("COMMAND", cloneCmd);
                console.log("ERROR",error);
                console.log("STDOUT",stdout);
                console.log("STDERR",stderr);
                console.log("=================== CLONE ERROR END ===================");
            }
        })

        // Fix permissions
        try {
            var targetPath = path.join(studentsReposPath, hash+".git")
            wrench.chmodSyncRecursive(targetPath, 0777);
        } catch (e) {
            throw new Meteor.Error("chmod error", e)
        }

        console.log("Give student the git repo link");
        return {gitlink: "git@i200.itcollege.ee:tudeng/" + hash + ".git"}
    },
    updatePoints: function(id, value) {
        check(this.userId, String);
        ExamCollection.update(id, {$set: {points: value}})
    },
    updateDate: function(id, value) {
        check(this.userId, String);
        ExamCollection.update(id, {$set: {date: value}})
    },
    emptyAllExamsPermanently: function() {
        check(this.userId, String);
        ExamCollection.remove({})
    }
});
