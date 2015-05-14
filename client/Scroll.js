Scroll = {
	click: function(e) {
		var elementId = $(e.currentTarget).attr('id')
		Scroll.scrollTo(elementId)
		Scroll.changeUrl(elementId)
	},
	scrollTo: function(elementId) {
		if (!elementId)
			return false
		var element = $('.layout-right #'+elementId)
		if (!element.is(':visible')) {
			$.notify('Vaatad edasijõudnute materjali.\nKui soovidki kõike materjali näha,\nsiis vasakul oleva sisukorra kõige\nall on nupp - vajuta seda.')
			element
				.removeClass('advanced')
				.parents('.advanced').removeClass('advanced')
		}
		var newTop = element.offset().top
		$('body, html').animate({
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