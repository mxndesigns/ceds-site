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