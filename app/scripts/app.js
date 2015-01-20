'use strict';

angular.module('geekValetLanding', ['ngRoute'])
  .config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        title: 'Explore a new World'
      })

  }])  

  .run(['$rootScope','helpText',function(rootScope,helpText){
        rootScope.helpText = helpText;


       }]);
