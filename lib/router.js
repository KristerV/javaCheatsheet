FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('mainLayout');
    }
});

FlowRouter.route('/eksam', {
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
