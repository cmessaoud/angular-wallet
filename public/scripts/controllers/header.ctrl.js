'use strict';
angular.module('WalletApp')
  .controller('HeaderCtrl', ['$scope', 'OperationsService', 'CurrenciesService', function ($scope, OperationsService, CurrenciesService) {


    $scope.currencies = CurrenciesService.getCurrencies();
    $scope.selectedCurrency = CurrenciesService.getSelectedCurrency();

    $scope.selectCurrency = function (index) {
      CurrenciesService.selectCurrency(index);
    };

    $scope.resetOperations = function () {
      OperationsService.resetOperations();
    };

  }]);
