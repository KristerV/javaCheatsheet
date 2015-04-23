Scroll = {
	click: function(e) {
		var elementId = $(e.currentTarget).attr('id')
		Scroll.scrollTo(elementId)
		Scroll.changeUrl(elementId)
	},
	scrollTo: function(elementId) {
		var newTop = $('.layout-right #'+elementId).offset().top
		$('body').animate({
			scrollTop: newTop
		}, 500);
	},
	changeUrl: function(elementId) {
		url = '/' + elementId
		window.history.pushState('', '', url);
	},
	scrollUrl: function() {
		var url = window.location.pathname
		var id = decodeURIComponent(url).substring(1)
		Scroll.scrollTo(id)
	}
}