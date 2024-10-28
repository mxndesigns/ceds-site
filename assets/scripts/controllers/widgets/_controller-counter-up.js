/***********************************************
 * WIDGET: COUNTER UP
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.numerator == 'undefined') {
		return;
	}

	PTFJS.counterUp = {
		init: function () {

			var counterUp = $('.ptf-counter-up');

			counterUp.each(function () {

				var $this = $(this),
					valueContainer = $this.find('.ptf-counter-up__value'),
					value = valueContainer.text();

				$this.one('inview', function () {

					valueContainer.text('0');

					valueContainer.numerator({
						easing: 'linear',
						duration: 1000,
						toValue: value
					});

				});

			});
		}
	}

	PTFJS.counterUp.init();

})(jQuery);