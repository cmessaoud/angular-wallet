'use strict';
angular.module('WalletApp')
  .controller('HomeCtrl', ['$scope', 'OperationsService', function ($scope, OperationsService) {

    $scope.operations = OperationsService.getOperations();
    $scope.total = OperationsService.getTotal();

  }]);
