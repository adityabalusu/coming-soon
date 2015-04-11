'use strict';

angular.module('geekValetLanding')
  .controller('AdminCtrl',['$scope','Api', function ($scope,api) {
    api.allServiceProviders.getList().then(function(service_providers){
        $scope.allServiceProviders = service_providers
    })
    $scope.addServiceProvider = function(){
      var service_provider ={"user":{"phone_number":"","email":""}} 
      $scope.allServiceProviders.unshift(service_provider)
    }

    $scope.fetchKeys = function(object){
        if(object){
            return _.keys(object)
        }
    }
  }]);
