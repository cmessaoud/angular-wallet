'use strict';
angular.module('WalletApp')
  .service('CurrenciesService', ['$window', function ($window) {

    var currencies = [{
        name: 'gbp',
        rate: 1,
        icon: 'fa-gbp'
      },
      {
        name: 'eur',
        rate: 1.36,
        icon: 'fa-eur'
      },
      {
        name: 'usd',
        rate: 1.54,
        icon: 'fa-usd'
    }];

    var selectedCurrency = angular.copy(currencies[0]);

    this.selectCurrency = function (index) {
      selectedCurrency.name = currencies[index].name;
      selectedCurrency.rate = currencies[index].rate;
      selectedCurrency.icon = currencies[index].icon;
      //here instead of doing selectedCurrency = currencies[index];
      //I prefer to assign property by property so that the reference to selectedCurrency
      //(from home.ctrl) is always to the same object so that I don't need any watch
      //in the home controller
    };

    this.getCurrencies = function () {
      return currencies;
    };

    this.getSelectedCurrency = function () {
      return selectedCurrency;
    };


  }]);
