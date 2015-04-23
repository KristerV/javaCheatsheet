Template.body.helpers({
	toc: function() {
		console.log("Here")
		return null
	}
})

Template.body.events({
	'click h1, click h2, click h3': function(e) {
		Scroll.click(e)
	}
})

Meteor.startup(function(){
	Meteor.setTimeout(function(){
		Scroll.scrollUrl()
	},1000)
})