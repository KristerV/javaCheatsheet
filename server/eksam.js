
Meteor.startup(function(){
    fs = Meteor.npmRequire('fs.extra')
    path = Meteor.npmRequire('path')
    // wrench = Meteor.npmRequire('wrench')
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
        // Insert new document
        var hash = ExamCollection.insert({
            studentName: studentName,
            createdAt: new Date(),
        })

        // Get random raw repo
        var srcpath = examPath + "toores/"
        var ls = fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
        var randomRepo = ls[Math.floor(Math.random()*ls.length)]

        // Copy raw repo to active and use hash as name
        var fromPath = srcpath + randomRepo
        var toPath = examPath + "tudeng/" + hash + ".git"
        try {
            fs.copyRecursive(fromPath, toPath);
        } catch (e) {
            console.error(e);
            throw new Meteor.Error("Copy error")
        }

        // Make sure permissions are correct


        // Give student the git repo link
        return {gitlink: "git@i200.itcollege.ee:tudeng/" + hash + ".git"}
    },
    updatePoints: function(id, value) {
        check(this.userId, String);
        ExamCollection.update(id, {$set: {points: value}})
    }
});
