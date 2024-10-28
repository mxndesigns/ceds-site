/***********************************************
 * WIDGET: JUSTIFIED GALLERY
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.justifiedGallery == 'undefined') {
		return;
	}

	PTFJS.justifiedGallery = {
		init: function () {

			var gallery = $('.ptf-justified-gallery');

			gallery.each(function () {

				var $this = $(this),
					row_height = $this.data('row-height') || 360,
					margins = $this.data('margins') || 0;

				$this.imagesLoaded(function () {
					$this.justifiedGallery({
						rowHeight: row_height,
						margins: margins,
						border: 0,
						caption: false
					});
				});

			});
		}
	}

	PTFJS.justifiedGallery.init();

})(jQuery);