(function() {
	"use strict";

  angular.module("NarrowItDownApp", [])
    .controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.directive('foundItems', FoundItemsDirective);

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			restrict: 'E',
	    scope: {
	      foundItems: '<',
	      onRemove: '&'
	    }
		};
		return ddo;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(menuSearchService) {
		var narrowDown = this;

		narrowDown.getMatchedMenuItems = function() {
			if (narrowDown.searchTerm === "") {
				narrowDown.items = [];
				return;
			}
			menuSearchService.getMatchedMenuItems(narrowDown.searchTerm).then(items => {
				narrowDown.items = items;
			});
		};

		narrowDown.removeItem = function(index) {
			narrowDown.items.splice(index, 1);
		};
	}

	MenuSearchService.$inject = ['$http']
	function MenuSearchService($http) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {
			return $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			}).then(result => {
					var items = result.data.menu_items;
			    return items.filter(x => x.description.indexOf(searchTerm) >= 0);
			});
		};
	}
})();
