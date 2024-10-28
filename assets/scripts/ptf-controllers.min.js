/***********************************************
 * INIT THIRD PARTY SCRIPTS
 ***********************************************/
(function ($) {

	'use strict';

	/**
	 * Onepage active element
	 */
	PTFJS.document.imagesLoaded(function () {

		PTFJS.document.on('scroll', function () {
			var scrollPos = PTFJS.document.scrollTop(),
				navbarHeight = $('.ptf-navbar--sticky').outerHeight();
			$('.sf-menu-onepage a').each(function () {
				var currLink = $(this),
					refElement = $(currLink.attr('href'));
				if (refElement.position().top <= scrollPos + navbarHeight && refElement.position().top + refElement.outerHeight() > scrollPos) {
					$('.sf-menu-onepage li').removeClass('current-menu-item');
					currLink.parent('li').addClass('current-menu-item');
				} else{
					currLink.parent('li').removeClass('current-menu-item');
				}
			});
		});

	});
	/**
	 * Remove overflow for sticky
	 */
	if ($('.sticky-column').length) {
		$('.ptf-main').css('overflow', 'inherit');
	}

	/**
	 * Add sepearator to filter
	 */
	$('<div class="filter-item">/</div>').insertAfter('.ptf-filters--style-3 .filter-item:not(:last-child)');

	/**
	 * Add active class to parent menu
	 */
	$('ul.sf-menu li.current-menu-item').parents('li').addClass('current-menu-item');

	/**
	 * Jarallax
	 */
	if (typeof $.fn.jarallax !== 'undefined') {
		$('.jarallax').jarallax({
			speed: 0.8
		});
	}

	/**
	 * AOS animation
	 */
	if (typeof AOS !== 'undefined') {

		function aos() {

			AOS.init({
				disable: 'mobile',
				duration: 1000
			});

			function aos_refresh() {
				AOS.refresh();
			}

			aos_refresh();
			PTFJS.debounceResize(aos_refresh);

		}

		PTFJS.window.on('ptf.site-loaded ptf.portfolio-filtered', aos);

	}

	/**
	 * Equal height
	 */
	function equal_height() {

		$('.ptf-main').each(function(){

			var highestBox = 0;

			$('.ptf-pricing-table', this).each(function(){

				if($(this).height() > highestBox) {
					highestBox = $(this).height();
				}

			});

			$('.ptf-pricing-table', this).height(highestBox);

		});

		$('.ptf-main').each(function(){

			var highestBox = 0;

			$('.ptf-approach-box', this).each(function(){

				if($(this).height() > highestBox) {
					highestBox = $(this).height();
				}

			});

			$('.ptf-approach-box', this).height(highestBox);

		});

		$('.row').each(function(){

			var highestBox = 0;

			$('.ptf-demo-item', this).each(function(){

				if($(this).height() > highestBox) {
					highestBox = $(this).height();
				}

			});

			$('.ptf-demo-item', this).height(highestBox);

		});

	}

	PTFJS.document.imagesLoaded(equal_height);
	PTFJS.debounceResize(equal_height);

	/**
	 * Accordion
	 */
	var allPanels = $('.ptf-accordion > dd').hide();

	$('.ptf-accordion > dt > a').click(function () {
		if (!$(this).parent().hasClass('is-open')) {
			allPanels.slideUp();
			allPanels.parent().find('dt').removeClass('is-open');
			$(this).parent().next().slideDown();
			$(this).parent().addClass('is-open');
		}
		return false;
	});

	/**
	 * Fancybox
	 */
	if (typeof $.fn.fancybox !== 'undefined') {
		$.fancybox.defaults.btnTpl = {
			close: '<button data-fancybox-close class="fancybox-button fancybox-button--close">' +
				'<i class="lnil lnil-close"></i>' +
				'</button>',
			arrowLeft: '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" href="javascript:;">' +
				'<i class="lnil lnil-chevron-left"></i>' +
				'</a>',
			arrowRight: '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" href="javascript:;">' +
				'<i class="lnil lnil-chevron-right"></i>' +
				'</a>',
			smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small">' +
				'<i class="lnil lnil-close"></i>' +
				'</button>'
		};
		$.fancybox.defaults.buttons = [
			'close'
		];
		$.fancybox.defaults.infobar = false;
		$.fancybox.defaults.transitionEffect = 'slide';
	}

})(jQuery);
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
/***********************************************
 * TEMPLATE: ISOTOPE
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof gsap === 'undefined') {
		return;
	}

	if (typeof Isotope == 'undefined') {
		return;
	}

	function ptf_image_tooltip() {

		$('.ptf-hover-reveal').remove();

		$('[data-tooltip-image]').each(function (index) {

			var $this = $(this),
				size = $this.data('tooltip-size') ? $this.data('tooltip-size').split('x') : false;

			PTFJS.body.append('<div class="ptf-hover-reveal"><div class="ptf-hover-reveal__inner"><div class="ptf-hover-reveal__img" style="background-image: url(' + $this.data('tooltip-image') + ');"></div></div></div>');

			if (size) {
				PTFJS.body.find('.ptf-hover-reveal').css({
					'width': size[0] + 'px',
					'height': size[1] + 'px'
				});
			}

			var reveal = PTFJS.body.find('.ptf-hover-reveal').eq(index),
				revealInner = reveal.find('.ptf-hover-reveal__inner'),
				revealImg = reveal.find('.ptf-hover-reveal__img'),
				revealImgWidth = revealImg.outerWidth(),
				revealImgHeight = revealImg.outerHeight();

			function position_element(ev) {

				var mousePos = PTFJS.getMousePos(ev),
					docScrolls = {
						left: PTFJS.body.scrollLeft() + PTFJS.document.scrollLeft(),
						top: PTFJS.body.scrollTop() + PTFJS.document.scrollTop()
					};

				gsap.set(reveal, {
					top: mousePos.y - revealImgHeight * 0.5 - docScrolls.top + 'px',
					left: mousePos.x - revealImgWidth * 0.25 - docScrolls.left + 'px'
				});

			}

			function mouse_enter(ev) {
				position_element(ev)
				show_image();
			}

			function mouse_move(ev) {
				requestAnimationFrame(function () {
					position_element(ev);
				});
			}

			function mouse_leave() {
				hide_image();
			}

			$this.on('mouseenter', mouse_enter);
			$this.on('mousemove', mouse_move);
			$this.on('mouseleave', mouse_leave);

			function show_image() {
				gsap.killTweensOf(revealInner);
				gsap.killTweensOf(revealImg);

				gsap.timeline({
						onStart: function () {
							gsap.set(reveal, {
								opacity: 1
							});
							gsap.set($this, {
								zIndex: 1000
							});
						}
					})
					.fromTo(revealInner, 1, {
						x: '-100%',
					}, {
						x: '0%',
						ease: Quint.easeOut,
					})
					.fromTo(revealImg, 1, {
							x: '100%',
						}, {
							x: '0%',
							ease: Quint.easeOut,
						},
						'-=1');

			}

			function hide_image() {
				gsap.killTweensOf(revealInner);
				gsap.killTweensOf(revealImg);
				gsap.timeline({
						onStart: function () {
							gsap.set($this, {
								zIndex: 999
							});
						},
						onComplete: function () {
							gsap.set($this, {
								zIndex: ''
							});
							gsap.set(reveal, {
								opacity: 0
							});
						}
					})
					.to(revealInner, 0.5, {
						x: '100%',
						ease: Quint.easeOut,
					})
					.to(revealImg, 0.5, {
						x: '-100%',
						ease: Quint.easeOut,
					}, '-=0.5');
			}

		});
	}

	ptf_image_tooltip();

	PTFJS.initPluginIsotope = {
		init: function () {

			$('.ptf-isotope-grid').each(function () {

				var $this = $(this),
					setControls = $this.data('controls'),
					setLayout = $this.data('layout'),
					setXGap = $this.data('x-gap'),
					setYGap = $this.data('y-gap');

				$this.css('--ptf-gutter-x', `${setXGap}px`);
				$this.css('--ptf-gutter-y', `${setYGap}px`);

				// filter
				var $filter = [];

				$filter = $(setControls);

				var $grid = $this.isotope({
					itemSelector: '.grid-item',
					layoutMode: setLayout,
					masonry: {
						columnWidth: '.grid-sizer'
					},
					cellsByRow: {
						columnWidth: '.grid-sizer'
					},
					filter: $filter ? $filter.find('[data-filter]').data('filter') : '*',
				});

				$grid.imagesLoaded().progress(function () {
					$grid.isotope('layout');
				});

				if ($filter.length) {

					function updateFilterCounts() {
						var itemElems = $grid.isotope('getFilteredItemElements');
						var $itemElems = $(itemElems);
						$filter.find('[data-filter]').each(function(i, button) {
							var $button = $(button);
							var filterValue = $button.attr('data-filter');
							if ( !filterValue ) {
								// do not update 'any' buttons
								return;
							}
							var count = $itemElems.filter(filterValue).length;
							$button.find('.filter-counter').text(count);
						});
					}

					updateFilterCounts();

					$filter.on('click', '[data-filter]', function (e) {

						e.preventDefault();

						var $this = $(this),
							filter = $this.data('filter');

						$this.addClass('filter-item-active').siblings().removeClass('filter-item-active');

						$grid.isotope({
							filter: filter
						});

						$grid.on('layoutComplete', function () {
							PTFJS.document.trigger('ptf.portfolio-filtered');
						});

					});

				}

			});

		}
	}

	PTFJS.initPluginIsotope.init();

	PTFJS.document.on('ptf-ajax-load-more', function (event) {
		ptf_image_tooltip();
	});

})(jQuery);
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
/***********************************************
 * TEMPLATE: NAVBAR SEARCH
 ***********************************************/
(function ($) {

	'use strict';

	var searchIsOpen = false;

	PTFJS.navbarSearch = {
		init: function () {
			var search = $('.ptf-navbar-search'),
				searchToggle = $('.ptf-navbar-search__toggle');

			searchToggle.on('click', function (e) {
				e.preventDefault();
				if (!searchIsOpen) {
					PTFJS.navbarSearch.open_search(search);
				} else {
					PTFJS.navbarSearch.close_search(search);
				}
			});

			PTFJS.document.keyup(function (e) {
				if (e.keyCode === 27 && searchIsOpen) {
					e.preventDefault();
					PTFJS.navbarSearch.close_search(search);
				}
			});

			PTFJS.document.on('scroll', function () {
				if (searchIsOpen) {
					PTFJS.navbarSearch.close_search(search);
				}
			})

		},
		open_search: function (search) {
			searchIsOpen = true;
			search.addClass('is-open');
		},
		close_search: function (search) {
			searchIsOpen = false;
			search.removeClass('is-open');
		}
	};

	PTFJS.navbarSearch.init();

})(jQuery);
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
/***********************************************
 * TEMPLATE: PRELOADER
 ***********************************************/
(function ($) {
	'use strict';

	// check if plugin defined
	if (typeof $.fn.animsition == 'undefined') {
		return;
	}

	var preloader = $('.animsition');

	if (!preloader.length) {
		PTFJS.window.trigger('ptf.site-loaded');
		PTFJS.html.addClass('ptf-is-page-loaded');
	}

	preloader.animsition({
		inDuration: 1500,
		outDuration: 1000,
		loadingParentElement: 'html',
		linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([rel="nofollow"]):not([href~="#"]):not([href^=mailto]):not([href^=tel]):not(.sf-with-ul)',
		loadingClass: 'animsition-loading-2',
		loadingInner: '<div class="animsition-bounce"><span class="double-bounce-one"></span><span class="double-bounce-two"></span></div>',
	});

	preloader.on('animsition.inEnd', function () {
		PTFJS.window.trigger('ptf.site-loaded');
		PTFJS.html.addClass('ptf-is-page-loaded');
	});

})(jQuery);
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
/***********************************************
 * WIDGET: CONTENT SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof Swiper === 'undefined') {
		return;
	}

	PTFJS.contentSlider = {
		init: function () {

			$('.ptf-content-slider').each(function () {

				var $this = $(this),
					anchor = $this.data('navigation-anchor'),
					gap = $this.data('gap') || 0,
					loop = $this.data('loop') || false,
					speed = $this.data('speed') || 1000,
					autoplay = $this.data('autoplay') ? true : false,
					centered = $this.data('slides-centered') ? true : false,
					freemode = $this.data('free-mode') ? true : false,
					slider_offset = $this.data('slider-offset') ? true : false,
					mousewheel = $this.data('mousewheel') ? true : false,
					autoplay_speed = $this.data('autoplay-speed'),
					settings = $this.data('slide-settings');

				var swiper = new Swiper(this, {
					init: false,
					spaceBetween: gap,
					grabCursor: true,
					initialSlide: settings.initial_slide ? settings.initial_slide : 0,
					loop: loop,
					speed: speed,
					centeredSlides: centered,
					freeMode: freemode,
					mousewheel: mousewheel,
					autoplay: autoplay ? {
						delay: autoplay_speed,
						disableOnInteraction: false
					} : false,
					autoHeight: true,
					slidesOffsetBefore: 100,
					slidesOffsetBefore: slider_offset ? $('.container').get(0).getBoundingClientRect().left + 15 : false,
					slidesOffsetAfter: slider_offset ? $('.container').get(0).getBoundingClientRect().left + 15 : false,
					navigation: {
						nextEl: $(anchor).find('.ptf-swiper-button-next'),
						prevEl: $(anchor).find('.ptf-swiper-button-prev'),
					},
					scrollbar: {
						el: $(anchor).find('.ptf-swiper-scrollbar')
					},
					pagination: {
						el: $(anchor).find('.ptf-swiper-pagination'),
						clickable: true
					},
					breakpoints: {
						// when window width is >= 576px
						576: {
							slidesPerView: settings.slides_to_show_mobile || settings.slides_to_show_tablet || settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll_mobile || settings.slides_to_scroll_tablet || settings.slides_to_scroll || 1,
						},
						// when window width is >= 768px
						768: {
							slidesPerView: settings.slides_to_show_tablet || settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll_tablet || settings.slides_to_scroll || 1,
						},
						// when window width is >= 992px
						992: {
							slidesPerView: settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll || 1,
						}
					}
				});

				swiper.init();

			});
		}
	}

	PTFJS.contentSlider.init();

})(jQuery);
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
/***********************************************
 * WIDGET: NEWS SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof Swiper === 'undefined') {
		return;
	}

	PTFJS.newsSlider = {
		init: function () {

			$('.ptf-news-slider').each(function () {

				var $this = $(this),
					anchor = $this.data('navigation-anchor');

				var swiper = new Swiper(this, {
					init: false,
					grabCursor: true,
					loop: true,
					speed: 1000,
					navigation: {
						nextEl: $(anchor).find('.ptf-swiper-button-next'),
						prevEl: $(anchor).find('.ptf-swiper-button-prev'),
					},
					scrollbar: {
						el: $(anchor).find('.ptf-swiper-scrollbar')
					},
					pagination: {
						el: $(anchor).find('.ptf-swiper-pagination'),
						clickable: false
					},
				});

				swiper.init();

			});
		}
	}

	PTFJS.newsSlider.init();

})(jQuery);
/***********************************************
* WIDGET: SHOWCASE 1
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.pagepiling == 'undefined') {
		return;
	}

	PTFJS.showcase1 = {

		init: function () {

			var fullpageSlider = $('.ptf-showcase-1');

			if (!fullpageSlider.length) {
				return;
			}

			PTFJS.body.css('overflow', 'hidden');
			PTFJS.html.css('overflow', 'hidden');

			fullpageSlider.pagepiling({
				scrollingSpeed: 800,
				loopBottom: true,
				navigation: false,
				afterLoad: function (anchorLink, index) {
					var current = fullpageSlider.find('.section.active');

					if (index > 1) {
						$('.ptf-showcase-fixed-footer--inner, .ptf-showcase-fixed-footer--outer').addClass('active');
					} else {
						$('.ptf-showcase-fixed-footer--inner, .ptf-showcase-fixed-footer--outer').removeClass('active');
					}

					if (current.hasClass('dark')) {
						setDark();
					} else {
						removeDark();
					}
				}
			});

			function setDark() {
				$('.ptf-header .ptf-navbar').addClass('ptf-navbar--white-text-on-top');
				$('.ptf-showcase-fixed-footer--inner, .ptf-showcase-fixed-footer--outer').addClass('dark');
			}

			function removeDark() {
				$('.ptf-header .ptf-navbar').removeClass('ptf-navbar--white-text-on-top');
				$('.ptf-showcase-fixed-footer--inner, .ptf-showcase-fixed-footer--outer').removeClass('dark');
			}

		}
	};

	PTFJS.showcase1.init();

})(jQuery);
/***********************************************
* WIDGET: SHOWCASE 2
 ***********************************************/
(function ($) {

	'use strict';

// check if plugin defined
	if (typeof Swiper === 'undefined') {
		return;
	}

	PTFJS.showcase2 = {

		init: function () {

			var showcaseInfo = $('.ptf-showcase-info'),
				listItem = $('.ptf-showcase-list__item');

			showcaseInfo.each(function () {

				var swiper = new Swiper(this, {
					init: false,
					spaceBetween: 30,
					speed: 1000,
					allowTouchMove: false
				});

				swiper.init();

				listItem.eq(0).addClass('is-active');

				listItem.on('mouseenter', function () {
					var $this = $(this);
					listItem.removeClass('is-active');
					$this.addClass('is-active');
					swiper.slideTo($this.index());
				});

			});

		}
	};

	PTFJS.showcase2.init();

})(jQuery);
/***********************************************
* WIDGET: SHOWCASE 3
 ***********************************************/
(function ($) {

	'use strict';

// check if plugin defined
	if (typeof Swiper === 'undefined') {
		return;
	}

	PTFJS.showcase3 = {

		init: function () {

			var showcaseSlider = $('.ptf-showcase-3');

			showcaseSlider.each(function () {

				var currentSlider = $(this);

				var swiper = new Swiper(this, {
					init: false,
					loop: false,
					spaceBetween: 0,
					speed: 1000,
					resistance: true,
					resistanceRatio: 0.5,
					parallax: true,
					grabCursor: true,
					navigation: {
						nextEl: $(this).find('.ptf-swiper-button-next'),
						prevEl: $(this).find('.ptf-swiper-button-prev'),
					},
					pagination: {
						el: $(this).find('.ptf-swiper-pagination'),
						clickable: true
					}
				});

				swiper.on('init slideChange', function () {
					var current = swiper.realIndex + 1,
						total = currentSlider.find('.swiper-slide').not('.swiper-slide-duplicate').length;

					currentSlider.find('.ptf-swiper-fraction .current').text(current);
					currentSlider.find('.ptf-swiper-fraction .total').text(total);
				});

				PTFJS.window.on('load resize', function () {

					var highestBox = 0;

					currentSlider.find('.ptf-showcase-slide').each(function(){

						if ($(this).height() > highestBox) {
							highestBox = $(this).height();
						}

					});

					currentSlider.find('.ptf-showcase-slide').height(highestBox);

				});

				swiper.init();

			});

		}
	};

	PTFJS.showcase3.init();

})(jQuery);