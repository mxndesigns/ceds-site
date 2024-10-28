/***********************************************
 * WIDGET: COUNTDOWN
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.countdown === 'undefined') {
		return;
	}

	PTFJS.countdown = {
		init: function ($scope) {

			$('.ptf-countdown').each(function () {

				var $this = $(this),
					dueDate = $this.data('due-date') || false;

				$this.countdown(dueDate, function (event) {
					$this.find('[data-days]').html(event.strftime('%D'));
					$this.find('[data-hours]').html(event.strftime('%H'));
					$this.find('[data-minutes]').html(event.strftime('%M'));
					$this.find('[data-seconds]').html(event.strftime('%S'));
				});

			});
		}
	}

	PTFJS.countdown.init();

})(jQuery);