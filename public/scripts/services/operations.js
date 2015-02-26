'use strict';
angular.module('WalletApp')
  .service('OperationsService', ['$window', 'CurrenciesService', 'CustomErrorService', function ($window, CurrenciesService, CustomErrorService) {

    var localStorage = $window.localStorage,
      operations,
      selectedCurrency = CurrenciesService.getSelectedCurrency(),
      total = {value: 0};
      //here total is an object with a key value instead of being
      //just a number and all the logic is done on the 'value' property of that object
      //so that I can keep a reference to the same object in controllers
    /*
     *  utils functions
     */
    var getPersistedOperations = function () {
      operations = localStorage['operations'] ? angular.fromJson(localStorage['operations']) : [];
    };

    var persistOperations = function () {
      var opers = angular.copy(operations);
      localStorage['operations'] = angular.toJson(opers);
    };

    var calculateTotal = function () {
      total.value = 0;
      operations.forEach(function (operation) {
        total.value += operation.amount;
      });
    };

    /*
     *  initialisation
     */
    getPersistedOperations();
    calculateTotal();


    this.addOperation = function (amount, callback) {
      //here amount can be strictly positive or strictly negative
      var err,
        operation;

      //the two first verifications are already performed in the walletNewOperation directive but still usefull
      //for separation of concerns in my opinion
      amount = parseFloat(amount);
      if (isNaN(amount)) {
        err = new CustomErrorService.NotANumberError('amount must be a number');
        return callback(err);
      }
      if (amount === 0) {
        err = new CustomErrorService.NotDifferentFromZeroError('amount must be different from zero');
        return callback(err);
      }

      amount = amount/selectedCurrency.rate;
      if(total.value + amount < 0) {
        err = new CustomErrorService.TotalNotPositiveError('the total after operation must remain positive');
        return callback(err);
      }
      operation = {
        amount: amount,
        date: new Date()
      };
      operations.unshift(operation);
      calculateTotal();
      persistOperations();
      callback(null, operation);
    };


    this.resetOperations = function () {
      //here instead of doing operations = [] I prefer to empty the array so it is always the same object
      //and the references to that object in controllers are always valid
      operations.splice(0);
      calculateTotal();
      localStorage['operations'] = [];
    };

    /*
     *  getters
     */
    this.getOperations = function () {
      return operations;
    };

    this.getTotal = function () {
      return total;
    };

  }]);
