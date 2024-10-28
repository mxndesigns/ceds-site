/***********************************************
 * TEMPLATE: STICKY NAVBAR
 ***********************************************/
(function ($) {

	'use strict';

	PTFJS.stickyNavbar = {

		init: function () {

			var navbarMain = $('.ptf-header:not(.ptf-header--slide) .ptf-navbar--main');

			navbarMain.each(function () {

				var $this = $(this);

				// sticky navbar
				var navbarHeight = $this.length ? $this.outerHeight() : 0,
					navbarMainOffset = $this.hasClass('ptf-navbar--offset') ? PTFJS.window.outerHeight() : navbarHeight;

				// fake navbar
				var navbarFake = $('<div class="ptf-fake-navbar">').hide();

				function _fixed_navbar() {

					$this.addClass('ptf-navbar--fixed');
					navbarFake.show();

				}

				function _unfixed_navbar() {

					$this.removeClass('ptf-navbar--fixed');
					navbarFake.hide();

				}

				function _on_scroll_navbar() {

					if (PTFJS.window.scrollTop() >= navbarMainOffset) {

						_fixed_navbar();

					} else {

						_unfixed_navbar();

					}

				}

				if ($this.hasClass('ptf-navbar--sticky')) {

					PTFJS.window.on('scroll resize', _on_scroll_navbar);

					_on_scroll_navbar();

					// append fake navbar
					$this.after(navbarFake);

					// fake navbar height after resize
					navbarFake.height($this.innerHeight());

					PTFJS.debounceResize(function () {
						navbarFake.height($this.innerHeight());
					});

				}

				// hide navbar on scroll
				var navbarHideOnScroll = $this.filter('.ptf-navbar--hide-on-scroll');

				PTFJS.throttleScroll(function (type, scroll) {

					var start = 450;

					function _show_navbar() {
						navbarHideOnScroll.removeClass('ptf-on-scroll-hide').addClass('ptf-on-scroll-show');
					}

					function _hide_navbar() {
						navbarHideOnScroll.removeClass('ptf-on-scroll-show').addClass('ptf-on-scroll-hide');
					}

					// hide or show
					if (type === 'down' && scroll > start) {
						_hide_navbar();
					} else if (type === 'up' || type === 'end' || type === 'start') {
						_show_navbar();
					}

					// add solid color
					if ($this.hasClass('ptf-navbar--transparent') && $this.hasClass('ptf-navbar--sticky')) {
						scroll > navbarHeight ? $this.addClass('ptf-navbar--solid') : $this.removeClass('ptf-navbar--solid');
					}

				});

			});

		}

	};

	PTFJS.stickyNavbar.init();

})(jQuery);