Template.body.events({
	'click h1, click h2, click h3, click h4, click h5, click h6': function(e) {
		Scroll.click(e)
	},
	'click a[href^="/"]': function(e) {
		e.preventDefault()
		var url = $(e.currentTarget).attr('href')
		Scroll.scrollUrl(url)
	}
})

Meteor.startup(function(){
	Meteor.setTimeout(function(){
		Scroll.scrollUrl()
	},1000)
})