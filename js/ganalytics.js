(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
	



window.setTimeout(function() {
	var _gaq = _gaq || [];
	
		$('.container').each(function(ind, val) {
			var source = $(val).attr('title')
			_gaq.push(['_trackEvent', 'Displayed-Container', source]);
			$(val).find('a').click(function() {
				_gaq.push(['_trackEvent', 'Click-Through', source]);
		})
		 
	})

	var numCon = $('.container').size()

	_gaq.push(['_setAccount', 'UA-59569215-1'],
		['_setCustomVar',1,'Container Total', numCon, 3],
		['_trackPageview']	);
}, 350)
			