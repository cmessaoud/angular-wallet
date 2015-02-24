'use strict';
angular.module('WalletApp')
  .controller('HeaderCtrl', ['$scope', 'OperationsService', function ($scope, OperationsService) {

    $scope.goToHome = function () {

    };

    $scope.resetOperations = function () {
      OperationsService.resetOperations();
    };

    $scope.viewSource = function () {

    };

  }]);
