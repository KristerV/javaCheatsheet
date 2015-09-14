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

	// hotjar
	(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:75422,hjsv:5};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
}

Meteor.startup(function(){
	Session.set('advancedMode', JSON.parse(localStorage.getItem('advancedMode')));
	Meteor.setTimeout(function(){
		Scroll.scrollUrl()
	},1000);

	// Google analytics
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-52715750-5', 'auto');
	ga('send', 'pageview');

})

$.notify.defaults({
  // whether to hide the notification on click
  clickToHide: true,
  // whether to auto-hide the notification
  autoHide: true,
  // if autoHide, hide after milliseconds
  autoHideDelay: 10000,
  // show the arrow pointing at the element
  arrowShow: true,
  // arrow size in pixels
  arrowSize: 5,
  // default positions
  elementPosition: 'bottom left',
  globalPosition: 'top right',
  // default style
  style: 'bootstrap',
  // default class (string or [string])
  className: 'error',
  // show animation
  showAnimation: 'slideDown',
  // show animation duration
  showDuration: 400,
  // hide animation
  hideAnimation: 'slideUp',
  // hide animation duration
  hideDuration: 200,
  // padding between element and notification
  gap: 2
})
