Template.body.helpers({
	advancedMode: function () {
		return JSON.parse(localStorage.getItem('advancedMode'))
	},
	advancedButton: function() {
		return Session.get('advancedMode')

	}
});

Template.body.events({
	'click h1, click h2, click h3, click h4, click h5, click h6': function(e) {
		Scroll.click(e)
	},
	'click a[href^="/"]': function(e) {
		e.preventDefault()
		var url = $(e.currentTarget).attr('href')
		Scroll.scrollUrl(url)
	},
	'click #advancedButton': function(e) {
		var advancedMode = !JSON.parse(localStorage.getItem('advancedMode'))
		Session.set('advancedMode', advancedMode)
		localStorage.setItem('advancedMode', advancedMode)
		if (advancedMode) {
			$('.advanced')
						.velocity("slideDown", { duration: 800 })
						.velocity("fadeIn", { duration: 800 })
		}
		else {
			$('.layout-left').animate({scrollTop: 0 }, 500);
			$('.advanced')
						.velocity({ opacity: 0 }, {delay: 500, duration: 800 })
						.velocity("slideUp", {duration: 800 })
		}
	}
})

Template.body.rendered = function() {
	Prism.highlightAll()
}

Meteor.startup(function(){
	Session.set('advancedMode', JSON.parse(localStorage.getItem('advancedMode')))
	console.log(JSON.parse(localStorage.getItem('advancedMode')))
	Meteor.setTimeout(function(){
		Scroll.scrollUrl()
	},1000)
})