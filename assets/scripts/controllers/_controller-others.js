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