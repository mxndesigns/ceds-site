/***********************************************
 * TEMPLATE: MENU OFFCANVAS
 ***********************************************/
(function ($) {

	'use strict';

	var menuIsOpen = false;

	PTFJS.menuOffcanvas = {
		init: function () {
			var menu = $('.ptf-offcanvas-menu'),
				navigation = menu.find('ul.sf-menu'),
				menuToggle = $('.js-offcanvas-menu-toggle'),
				siteOverlay = $('.ptf-site-overlay');

			if (typeof $.fn.superclick !== 'undefined') {

				navigation.superclick({
					delay: 300,
					cssArrows: false,
					animation: {
						opacity: 'show',
						height: 'show'
					},
					animationOut: {
						opacity: 'hide',
						height: 'hide'
					},
				});

			}

			menuToggle.on('click', function (e) {
				e.preventDefault();
				if (!menuIsOpen) {
					PTFJS.menuOffcanvas.open_menu(menu, siteOverlay);
				} else {
					PTFJS.menuOffcanvas.close_menu(menu, siteOverlay);
				}
			});

			siteOverlay.on('click', function (e) {
				e.preventDefault();
				if (menuIsOpen) {
					PTFJS.menuOffcanvas.close_menu(menu, siteOverlay);
				}
			});

			PTFJS.document.keyup(function (e) {
				if (e.keyCode === 27 && menuIsOpen) {
					e.preventDefault();
					PTFJS.menuOffcanvas.close_menu(menu, siteOverlay);
				}
			});

		},
		open_menu: function (menu, siteOverlay) {
			menuIsOpen = true;
			menu.addClass('is-open');
			siteOverlay.fadeIn();
		},
		close_menu: function (menu, siteOverlay) {
			menuIsOpen = false;
			menu.removeClass('is-open');
			siteOverlay.fadeOut();
		}
	};

	PTFJS.menuOffcanvas.init();

})(jQuery);