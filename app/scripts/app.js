'use strict';

angular.module('geekValetLanding', ['ngRoute','restangular','ngDialog','ngSanitize','ui.scrollfix','ui.keypress','duScroll','leaflet-directive'])
  .value('duScrollGreedy', true)
  .config(['$routeProvider','RestangularProvider',function($routeProvider,RestangularProvider){
    $routeProvider.when('/close', {
        templateUrl: 'views/close.html',
        controller: 'CloseCtrl',
      }).when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
    RestangularProvider.setBaseUrl('/api');

  }])  

  .run(['$rootScope','helpText','$anchorScroll',function(rootScope,helpText,$anchorScroll){
        rootScope.helpText = helpText;
        rootScope.moment = moment
        //$anchorScroll.yOffset = 52;
         
      }]);
  