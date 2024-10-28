/***********************************************
* WIDGET: SHOWCASE 2
 ***********************************************/
(function ($) {

	'use strict';

// check if plugin defined
	if (typeof Swiper === 'undefined') {
		return;
	}

	PTFJS.showcase2 = {

		init: function () {

			var showcaseInfo = $('.ptf-showcase-info'),
				listItem = $('.ptf-showcase-list__item');

			showcaseInfo.each(function () {

				var swiper = new Swiper(this, {
					init: false,
					spaceBetween: 30,
					speed: 1000,
					allowTouchMove: false
				});

				swiper.init();

				listItem.eq(0).addClass('is-active');

				listItem.on('mouseenter', function () {
					var $this = $(this);
					listItem.removeClass('is-active');
					$this.addClass('is-active');
					swiper.slideTo($this.index());
				});

			});

		}
	};

	PTFJS.showcase2.init();

})(jQuery);