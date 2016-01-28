Template.eksam.helpers({
    examOpen: function() {
        var doc = ExamCollection.findOne() || {}
        return doc.open
    },
    gitlink: function() {
        return Session.get("myGitLink")
    },
    exams: function() {
        return ExamCollection.find({type: {$ne: "status"}}, {sort: {createdAt: 1}})
    },
    createdAt: function() {
        return moment(this.createdAt).format("HH:mm D.MM.YYYY")
    }
})

Template.eksam.events({
    'submit form': function(e) {
        e.preventDefault()
        var name = $("#studentName").val()
        Meteor.call('getGitLink', name, function(err, result){
            if (err)
                console.log("err",err);
            else {
                Session.set("myGitLink", result.gitlink)
            }
        })
    },
    'click #toggleExam': function(e) {
        Meteor.call('toggleExam')
    },
    'click #emptyExam': function(e) {
        var c = confirm("for sure for sure? No data is backed up or anything..")
        if (c)
            Meteor.call('emptyAllExamsPermanently')
    },
    'blur input.points': function(e) {
        var id = e.target.id
        var value = e.target.value
        Meteor.call("updatePoints", id, value)
    },
    'blur input.date': function(e) {
        var id = e.target.id
        var value = e.target.value
        Meteor.call("updateDate", id, value)
    },
})
