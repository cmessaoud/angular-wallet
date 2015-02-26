'use strict';
angular.module('WalletApp')
  .service('CustomErrorService', [function () {
    //That service allows to create custom errors

    var createError = function (errorName, defaultMessage) {
      //Creates a new custom error constructor, that prototypally inherits from the Error native javascript.
      var CustomError = function (message) {
        this.name = errorName;
        this.message = message || defaultMessage;
      };
      CustomError.prototype = new Error();
      CustomError.prototype.constructor = CustomError;
      return CustomError;
    };

    this.NotANumberError = createError('NotANumberError', 'not a number error');
    this.NotDifferentFromZeroError = createError('NotDifferentFromZeroError', 'not different from zero error');
    this.TotalNotPositiveError = createError('TotalNotPositiveError', 'total not positive error');
    this.InputNotStrictlyPositiveError = createError('InputNotStrictlyPositiveError', 'input not strictly positive error');

  }]);
