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


    this.addOperation = function (amount) {
      var operation = {
        amount: amount,
        date: new Date()
      };
      operations.push(operation);
      calculateTotal();
      persistOperations();
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
