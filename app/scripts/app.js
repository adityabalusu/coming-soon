'use strict';

angular.module('geekValetLanding', ['ngRoute','restangular','ngDialog','ngSanitize','ui.scrollfix'])
  .config(['$routeProvider','RestangularProvider',function($routeProvider,RestangularProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
    RestangularProvider.setBaseUrl('/api');

  }])  

  .run(['$rootScope','helpText',function(rootScope,helpText){
        rootScope.helpText = helpText;
         
      }]);
  