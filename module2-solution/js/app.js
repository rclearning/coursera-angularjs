(function() {
  "use strict";

  angular.module("ShoppingListCheckOff", [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.markItemAsBought = function(itemIndex) {
      ShoppingListCheckOffService.markItemAsBought(itemIndex);
    };

    toBuy.hasNothingToShow = function() {
      return toBuy.items.length === 0;
    }
  }

  AlreadyBoughtController = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getItemsAlreadyBought();

    alreadyBought.hasNothingToShow = function() {
      return alreadyBought.items.length === 0;
    }
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
      { name: "bread", quantity: "2" },
      { name: "meat", quantity: "3" },
      { name: "pasta", quantity: "1" },
      { name: "cereals", quantity: "2" },
      { name: "cheese", quantity: "7" },
    ];
    var itemsAlreadyBought = [];

    service.getItemsToBuy = function() {
      return itemsToBuy;
    };
    service.getItemsAlreadyBought = function() {
      return itemsAlreadyBought;
    };

    service.markItemAsBought = function(itemIndex) {
      var itemBought = itemsToBuy.splice(itemIndex, 1);
      itemsAlreadyBought.push(itemBought[0]);
    };
  }
})();
