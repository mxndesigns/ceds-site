/***********************************************
 * TEMPLATE: MENU SLIDE
 ***********************************************/
(function ($) {

	'use strict';

	var menuIsOpen = false;

	PTFJS.menuSlide = {
		init: function () {
			var menu = $('.ptf-slide-menu'),
				navigation = menu.find('ul.sf-menu'),
				menuToggle = $('.js-slide-menu-toggle'),
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
					PTFJS.menuSlide.open_menu(menu, siteOverlay, menuToggle);
				} else {
					PTFJS.menuSlide.close_menu(menu, siteOverlay, menuToggle);
				}
			});

			siteOverlay.on('click', function (e) {
				e.preventDefault();
				if (menuIsOpen) {
					PTFJS.menuSlide.close_menu(menu, siteOverlay, menuToggle);
				}
			});

			PTFJS.document.keyup(function (e) {
				if (e.keyCode === 27 && menuIsOpen) {
					e.preventDefault();
					PTFJS.menuSlide.close_menu(menu, siteOverlay, menuToggle);
				}
			});

		},
		open_menu: function (menu, siteOverlay, menuToggle) {
			menuIsOpen = true;
			menu.addClass('is-open');
			menuToggle.addClass('is-open');
			siteOverlay.fadeIn();
		},
		close_menu: function (menu, siteOverlay, menuToggle) {
			menuIsOpen = false;
			menu.removeClass('is-open');
			menuToggle.removeClass('is-open');
			siteOverlay.fadeOut();
		}
	};

	PTFJS.menuSlide.init();

})(jQuery);