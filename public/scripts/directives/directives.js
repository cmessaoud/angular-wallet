'use strict';
angular.module('WalletApp')
  .directive('walletNewOperation', ['$timeout', 'OperationsService', 'CustomErrorService', function ($timeout, OperationsService, CustomErrorService) {
    return {
      restrict: 'E',
      templateUrl: 'templates/newOperation.html',
      link: function (scope) {

        scope.newOperationAmount = 0;
        scope.confirmMessage = '';
        scope.error;

        var parsedAmount;

        var saveOperation = function (amount) {
          OperationsService.addOperation(amount, function (err, operation) {
            if (err) {
              scope.error = err;
              $timeout(function () {
                scope.error = null;
              }, 5000);
            } else {
              scope.confirmMessage = 'Operation registered with success';
              $timeout(function () {
                scope.confirmMessage = '';
              }, 5000);
            }
            scope.newOperationAmount = 0;
          });
        };

        var checkAmount = function () {
          parsedAmount = parseFloat(scope.newOperationAmount);
          if (isNaN(parsedAmount)) {
              // scope.error = new CustomErrorService.NotANumberError('input must be a number');
              scope.error = new Error('input must be a number');
              $timeout(function () {
                scope.error = null;
              }, 5000);
            return false;
          }
          if (parsedAmount <= 0) {
            scope.error = new CustomErrorService.InputNotStrictlyPositiveError('input must be strictly positive number');
            $timeout(function () {
              scope.error = null;
            }, 5000);
            return false;
          }
          return true;
        };

        scope.addDeposit = function () {
          if(checkAmount()) {
            saveOperation(parsedAmount);
          }
        };

        scope.addWithdrawal = function () {
          if(checkAmount()) {
            saveOperation(-parsedAmount);
          }
        };

      }
    }
  }]);
