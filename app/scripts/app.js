'use strict';

angular.module('geekValetLanding', [
   'ngRoute',
   'restangular',
   'ngDialog',
   'ngSanitize',
   'ui.scrollfix',
   'ui.bootstrap',
   'ui.keypress',
   'duScroll',
   'leaflet-directive',
   'cgBusy',
   'angularFileUpload'
   ])
  .value('duScrollGreedy', true)
  .config(['$routeProvider','RestangularProvider','$locationProvider',function($routeProvider,RestangularProvider,$locationProvider){
    
    $routeProvider.when('/admin/missedorders', {
        templateUrl: 'views/missedorders.html',
        controller: 'MissedordersCtrl',
      }).when('/feedback/:rating/:orderinfo', {
        templateUrl: 'views/editspdetails.html',
        controller: 'EditspCtrl',
      }).when('/admin/serviceprovider/:spid/edit', {
        templateUrl: 'views/editspdetails.html',
        controller: 'EditspCtrl',
      }).when('/admin/serviceprovider/add', {
        templateUrl: 'views/addserviceprovider.html',
        controller: 'AddspCtrl',
      }).when('/admin/orders', {
        templateUrl: 'views/order.html',
        controller: 'OrderCtrl',
      }).when('/admin/orders/:orderid/details', {
        templateUrl: 'views/orderdetails.html',
        controller: 'OrderdetailsCtrl',
      }).when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
      }).when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      
    RestangularProvider.setBaseUrl('/api');
    $locationProvider.html5Mode(true);
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
        rootScope.fetchKeys = function(object){
        if(object){
            return _.keys(object)
        }
    }
        //$anchorScroll.yOffset = 52;
         
      }]);
  