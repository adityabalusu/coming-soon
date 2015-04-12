'use strict';

angular.module('geekValetLanding')
  .controller('AdminCtrl',['$scope','Api', function ($scope,api) {
    $scope.new_service_provider = {};
    $scope.new_skills = {}
    api.allServiceProviders.getList().then(function(service_providers){
        $scope.allServiceProviders = service_providers
    })
    $scope.fetchKeys = function(object){
        if(object){
            return _.keys(object)
        }
    }
    
  }]);
