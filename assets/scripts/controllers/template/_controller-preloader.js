/***********************************************
 * TEMPLATE: PRELOADER
 ***********************************************/
(function ($) {
	'use strict';

	// check if plugin defined
	if (typeof $.fn.animsition == 'undefined') {
		return;
	}

	var preloader = $('.animsition');

	if (!preloader.length) {
		PTFJS.window.trigger('ptf.site-loaded');
		PTFJS.html.addClass('ptf-is-page-loaded');
	}

	preloader.animsition({
		inDuration: 1500,
		outDuration: 1000,
		loadingParentElement: 'html',
		linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([rel="nofollow"]):not([href~="#"]):not([href^=mailto]):not([href^=tel]):not(.sf-with-ul)',
		loadingClass: 'animsition-loading-2',
		loadingInner: '<div class="animsition-bounce"><span class="double-bounce-one"></span><span class="double-bounce-two"></span></div>',
	});

	preloader.on('animsition.inEnd', function () {
		PTFJS.window.trigger('ptf.site-loaded');
		PTFJS.html.addClass('ptf-is-page-loaded');
	});

})(jQuery);