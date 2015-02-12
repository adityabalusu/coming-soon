'use strict';

angular.module('geekValetLanding', ['ngRoute','restangular','ngDialog','ngSanitize','ui.scrollfix','ui.keypress','duScroll'])
  .value('duScrollGreedy', true)
  .config(['$routeProvider','RestangularProvider',function($routeProvider,RestangularProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
    RestangularProvider.setBaseUrl('/api');

  }])  

  .run(['$rootScope','helpText','$anchorScroll',function(rootScope,helpText,$anchorScroll){
        rootScope.helpText = helpText;
        //$anchorScroll.yOffset = 52;
         
      }]);
  