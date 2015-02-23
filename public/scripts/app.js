'use strict';
var WalletApp = angular.module('WalletApp', ['ngRoute']);
WalletApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    }).
    when('/reset', {
      templateUrl: 'templates/reset.html',
      controller: 'ResetCtrl'
    }).
    when('/viewSource', {
      templateUrl: 'templates/viewSource.html',
      controller: 'ViewSourceCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);
