/***********************************************
 * TEMPLATE: MENU DEFAULT
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.superfish == 'undefined') {
		return;
	}

	PTFJS.menuDefault = {
		init: function () {

			var menu = $('.ptf-nav--default'),
				navigation = menu.find('ul.sf-menu');

			navigation.superfish({
				popUpSelector: 'ul.sub-menu',
				delay: 0,
				speed: 300,
				speedOut: 300,
				cssArrows: false,
				animation: {
					opacity: 'show',
					marginTop: '0',
					visibility: 'visible'
				},
				animationOut: {
					opacity: 'hide',
					marginTop: '10px',
					visibility: 'hidden'
				}
			});

			function correctDropdownPosition($item) {

				$item.removeClass('left');

				var $dropdown = $item.children('ul.sub-menu');

				if ($dropdown.length) {
					var rect = $dropdown[0].getBoundingClientRect();

					if (rect.left + rect.width > PTFJS.window.width()) {
						$item.addClass('left');
					}

				}

			}

			navigation.on('mouseenter', 'li.menu-item-has-children', function () {
				correctDropdownPosition($(this));
			});

		}
	}

	PTFJS.menuDefault.init();

})(jQuery);