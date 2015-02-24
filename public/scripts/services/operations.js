'use strict';
angular.module('WalletApp')
  .service('OperationsService', ['$window', function ($window) {

    var localStorage = $window.localStorage,
      operations,
      total = {value: 0};

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
        err = new Error('amount must be a number');
        return callback(err);
      }
      if (amount === 0) {
        err = new Error('amount must be different from zero');
        return callback(err);
      }
      if(total.value + amount < 0) {
        err = new Error('the total after operation must remain positive');
        return callback(err);
      }
      operation = {
        amount: amount,
        date: new Date()
      };
      operations.push(operation);
      calculateTotal();
      persistOperations();
      callback(null, operation);
    };


    this.resetOperations = function () {
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
