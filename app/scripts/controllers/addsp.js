'use strict';

angular.module('geekValetLanding')
  .controller('AddspCtrl',['$scope','Api','$location',function ($scope,api,location) {
    $scope.new_service_provider = {};
    $scope.start_time = new moment.unix(1428719400);
    $scope.end_time = new moment.unix(1428766200);
    $scope.createServiceProvider = function(){
        api.allServiceProviders.post($scope.new_service_provider).then(function(response){
            location.url('admin')
        })
    }
    $scope.start_time_changed =function(){
        $scope.new_service_provider.day_start = $scope.start_time.getHours()*12 + $scope.start_time.getMinutes()/5;
    }
    $scope.end_time_changed =function(){
        $scope.new_service_provider.day_end = $scope.end_time.getHours()*12 + $scope.end_time.getMinutes()/5;
    }
    $scope.addSkills = function(skill){
      $scope.new_skills[skill] = [];
      $scope.new_service_provider.skills = $scope.new_skills
    }
  }]);
