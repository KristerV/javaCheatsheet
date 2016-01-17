ExamCollection = new Mongo.Collection('exam')

if(Meteor.isServer){
    Meteor.publish("exam", function(argument){
        if (this.userId)
            return ExamCollection.find()
        else
            return ExamCollection.find({type: "status"})
    });
}

if (Meteor.isServer) {
    Accounts.validateNewUser(function(user){
        var count = Meteor.users.find().fetch().length
        if (count > 0) {
            throw new Meteor.Error(403, "Nii lihtsalt sa adminniks ei saa");
            return false
        } else {
            return true
        }
    })
} else if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    })
}
