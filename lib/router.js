
FlowRouter.route('/', {
    name: "eksam",
    subscriptions: function(params, queryParams) {
        this.register('exam', Meteor.subscribe('exam'));
    },
    action: function(params, queryParams) {
        BlazeLayout.render('eksam');
    }
});

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('mainLayout');
    }
};
