Template.body.helpers({
	toc: function() {
		console.log("Here")
		return null
	}
})

Template.body.events({
	'click h1, click h2, click h3': function(e) {
		var elementId = $(e.currentTarget)
		var indexLeft = $('.layout-left h1, .layout-left h2, .layout-left h3').index(elementId)
		var indexRight = $('.layout-right h1, .layout-right h2, .layout-right h3').index(elementId)
		var index = indexLeft == -1 ? indexRight : indexLeft

		$('html, body').animate({
			scrollTop: $('.layout-right h1, .layout-right h2, .layout-right h3').eq(index).offset().top
		}, 500);

	}
})