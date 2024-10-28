/***********************************************
 * TEMPLATE: CUSTOM CURSOR
 ***********************************************/
(function ($) {

	'use strict';

	if (!$('.ptf-is--custom-cursor').length) {
		return;
	}

	PTFJS.customCursor = {
		init: function () {

			PTFJS.body.append('<div class="ptf-custom-cursor"><span>Hold<br>and Drag</span></div>');

			var customCursor = $('.ptf-custom-cursor');

			PTFJS.document.on('mousemove pointermove', function (e) {
				customCursor.get(0).style.setProperty('--ptf-custom-cursor__x', `${e.clientX}px`);
				customCursor.get(0).style.setProperty('--ptf-custom-cursor__y', `${e.clientY}px`);
			});

			PTFJS.document.on('mouseenter', '[data-cursor]', function () {
				customCursor.addClass($(this).data('cursor'));
				customCursor.addClass('is-visible');
			}).on('mouseleave', '[data-cursor]', function () {
				customCursor.removeClass($(this).data('cursor'));
				customCursor.removeClass('is-visible');
			});

		}
	};

	if (!PTFJS.isMobile.any()) {
		PTFJS.customCursor.init();
	}

})(jQuery);