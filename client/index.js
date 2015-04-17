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

Scroll = {
	click: function(e) {
		var elementId = $(e.currentTarget)
		var indexLeft = $('.layout-left h1, .layout-left h2, .layout-left h3').index(elementId)
		var indexRight = $('.layout-right h1, .layout-right h2, .layout-right h3').index(elementId)
		var index = indexLeft == -1 ? indexRight : indexLeft
		var element = $('.layout-right h1, .layout-right h2, .layout-right h3').eq(index)
		Scroll.scrollTo(element)
		Scroll.changeUrl(element)
	},
	scrollTo: function(element) {
		$('html, body').animate({
			scrollTop: element.offset().top
		}, 500);
	},
	changeUrl: function(element) {
		var title = element.text()
		var url = encodeURIComponent(title)
		url = '/' + url
		window.history.pushState('', '', url);
	},
	scrollUrl: function() {
		var url = window.location.pathname
		var title = decodeURIComponent(url).substring(1)
		var element = $('.layout-right h1:contains('+title+'), .layout-right h2:contains('+title+'), .layout-right h3:contains('+title+')')
		Scroll.scrollTo(element)
	}
}

Meteor.startup(function(){
	Meteor.setTimeout(function(){
		Scroll.scrollUrl()
	},1000)
})