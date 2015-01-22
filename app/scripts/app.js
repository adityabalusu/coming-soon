'use strict';

angular.module('geekValetLanding', ['ngRoute'])
  .config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })

  }])  

  .run(['$rootScope','helpText',function(rootScope,helpText){
        rootScope.helpText = helpText;


       }]);
  