/***********************************************
 * WIDGET: ADVANTAGE BOX
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.numerator == 'undefined') {
		return;
	}

	PTFJS.advantageBox = {
		init: function () {

			var counterUp = $('.ptf-advantage-box');

			counterUp.each(function () {

				var $this = $(this),
					valueContainer = $this.find('.ptf-advantage-box__value'),
					value = valueContainer.text();

				$this.one('inview', function () {

					valueContainer.text('0');

					valueContainer.numerator({
						easing: 'linear',
						duration: 1000,
						delimiter: false,
						toValue: value
					});

				});

			});
		}
	}

	PTFJS.advantageBox.init();

})(jQuery);