/***********************************************
* WIDGET: SHOWCASE 1
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.pagepiling == 'undefined') {
		return;
	}

	PTFJS.showcase1 = {

		init: function () {

			var fullpageSlider = $('.ptf-showcase-1');

			if (!fullpageSlider.length) {
				return;
			}

			PTFJS.body.css('overflow', 'hidden');
			PTFJS.html.css('overflow', 'hidden');

			fullpageSlider.pagepiling({
				scrollingSpeed: 800,
				loopBottom: true,
				navigation: false,
				afterLoad: function (anchorLink, index) {
					var current = fullpageSlider.find('.section.active');

					if (index > 1) {
						$('.ptf-showcase-fixed-footer--inner, .ptf-showcase-fixed-footer--outer').addClass('active');
					} else {
						$('.ptf-showcase-fixed-footer--inner, .ptf-showcase-fixed-footer--outer').removeClass('active');
					}

					if (current.hasClass('dark')) {
						setDark();
					} else {
						removeDark();
					}
				}
			});

			function setDark() {
				$('.ptf-header .ptf-navbar').addClass('ptf-navbar--white-text-on-top');
				$('.ptf-showcase-fixed-footer--inner, .ptf-showcase-fixed-footer--outer').addClass('dark');
			}

			function removeDark() {
				$('.ptf-header .ptf-navbar').removeClass('ptf-navbar--white-text-on-top');
				$('.ptf-showcase-fixed-footer--inner, .ptf-showcase-fixed-footer--outer').removeClass('dark');
			}

		}
	};

	PTFJS.showcase1.init();

})(jQuery);