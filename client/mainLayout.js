Template.mainLayout.helpers({
	advancedMode: function () {
		return JSON.parse(localStorage.getItem('advancedMode'))
	},
	advancedButton: function() {
		return Session.get('advancedMode')

	}
});

Template.mainLayout.events({
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

Template.mainLayout.rendered = function() {
	// hotjar
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:75424,hjsv:5};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');

	Meteor.setTimeout(function(){
		Prism.highlightAll()
	}, 1000);

}
