FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('mainLayout');
    }
});

FlowRouter.route('/', {
    name: "eksam",
    action: function(params, queryParams) {
        BlazeLayout.render('eksam');
    }
});

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('mainLayout');
    }
};
