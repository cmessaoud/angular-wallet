'use strict';
angular.module('WalletApp')
  .directive('walletNewOperation', ['OperationsService', function (OperationsService) {
    return {
      restrict: 'E',
      templateUrl: 'templates/newOperation.html',
      link: function (scope) {

        scope.newOperationAmount = 0;
        scope.confirmMessage = '';
        var parsedAmount;

        var saveOperation = function (amount) {
          OperationsService.addOperation(amount, function (err, operation) {
            if (err) {
              scope.confirmMessage = err.message;
            } else {
              scope.confirmMessage = 'Operation registered with success';
            }
            scope.newOperationAmount = 0;
          });
        };

        var checkAmount = function () {
          parsedAmount = parseFloat(scope.newOperationAmount);
          if (isNaN(parsedAmount)) {
            scope.confirmMessage = 'amount must be a number';
            return false;
          }
          if (parsedAmount <= 0) {
            scope.confirmMessage = 'amount must be a strictly positive number';
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
