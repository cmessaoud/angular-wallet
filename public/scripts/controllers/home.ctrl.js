'use strict';
angular.module('WalletApp')
  .controller('HomeCtrl', ['$scope', 'OperationsService', 'CurrenciesService', function ($scope, OperationsService, CurrenciesService) {

    $scope.operations = OperationsService.getOperations();
    $scope.total = OperationsService.getTotal();

    $scope.currencies = CurrenciesService.getCurrencies();
    $scope.selectedCurrency = CurrenciesService.getSelectedCurrency();

    $scope.selectCurrency = function (index) {
      CurrenciesService.selectCurrency(index);
    }

  }]);
