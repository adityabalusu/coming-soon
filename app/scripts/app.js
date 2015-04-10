'use strict';

angular.module('geekValetLanding', ['ngRoute','restangular','ngDialog','ngSanitize','ui.scrollfix','ui.keypress','duScroll','leaflet-directive'])
  .value('duScrollGreedy', true)
  .config(['$routeProvider','RestangularProvider',function($routeProvider,RestangularProvider){
    $routeProvider.when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
      }).when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      
    RestangularProvider.setBaseUrl('/api');

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      // .. to look for getList operations
      if (operation === "getList") {
        // .. and handle the data and meta data
        extractedData = data.objects;
        extractedData.meta = data.meta;
      } else {
        extractedData = data;
      }
      return extractedData;
    });

  }])  

  .run(['$rootScope','helpText','$anchorScroll',function(rootScope,helpText,$anchorScroll){
        rootScope.helpText = helpText;
        rootScope.moment = moment
        //$anchorScroll.yOffset = 52;
         
      }]);
  