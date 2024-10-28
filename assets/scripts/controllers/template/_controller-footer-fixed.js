/***********************************************
 * TEMPLATE: FOOTER FIXED
 ***********************************************/
(function ($) {

	'use strict';

	if (!$('.ptf-is--footer-fixed').length) {
		return;
	}

	if (PTFJS.isMobile.any()) {
		return;
	}

	PTFJS.fixedFooter = {
		init: function () {

			var footer = $('.ptf-footer');

			PTFJS.window.on('load resize', function () {
				var footerHeight = footer.outerHeight();
				if (footerHeight <= PTFJS.window.height()) {
					var leftValue = PTFJS.body.css('padding-left');
					footer.css({
						'position': 'fixed',
						'left': leftValue,
						'right': '0',
						'bottom': '0'
					});
					PTFJS.body.css('padding-bottom', footerHeight);
				} else {
					PTFJS.body.css('padding-bottom', 0);
					footer.removeAttr('style');
				}

			});

		}
	};

	PTFJS.fixedFooter.init();

})(jQuery);