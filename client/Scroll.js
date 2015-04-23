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
		if (elementId[0] != '/')
			elementId = '/' + elementId
		window.history.pushState('', '', elementId);
	},
	scrollUrl: function(url) {
		if (url)
			Scroll.changeUrl(url)
		else
			var url = window.location.pathname
		var id = decodeURIComponent(url).substring(1)
		Scroll.scrollTo(id)
	}
}