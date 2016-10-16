(function() {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.foodMessage = "";
    $scope.lunchItens = "";
    $scope.messageClass = "";
    $scope.inputClass = "";

    $scope.checkIfTooMuch = function() {
      var itens = $scope.lunchItens.split(",");
      var itensNotBlak = itens.filter(x => x.trim());

      if (itensNotBlak.length === 0) {
        $scope.foodMessage = "Please enter data first";
        $scope.messageClass = "message-attention";
        $scope.inputClass = "input-attention";
      }
      else {
        $scope.foodMessage = itensNotBlak.length <= 3
          ? "Enjoy!"
          : "Too much!";
        $scope.messageClass = "message-success";
        $scope.inputClass = "input-success";
      }
    };
  }
})();
