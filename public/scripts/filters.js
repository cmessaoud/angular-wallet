'use strict';
angular.module('WalletApp')
  .filter('currency', [function () {
    return function (amount, currency) {
      return amount * currency.rate;
    };
  }]);
