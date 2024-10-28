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