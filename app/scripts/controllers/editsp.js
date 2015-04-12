'use strict';

angular.module('geekValetLanding')
  .controller('EditspCtrl',['$scope','$location','$routeParams','Api','$upload',function ($scope,location,routeParams,api,$upload) {
    $scope.new_skills = {};
    $scope.start_time = new moment.unix(1428719400);
    $scope.end_time = new moment.unix(1428766200);
    api.admin.one('serviceprovider',routeParams.spid).get().then(function(response){
        $scope.service_provider = response
        if($scope.service_provider.skills ==null){
            $scope.service_provider.skills ={}
        }
        
    })
    
    $scope.editServiceProvider = function(){
        $scope.service_provider.save().then(function(response){
            location.url('admin');
        })
    }
    $scope.start_time_changed =function(){
        $scope.service_provider.day_start = $scope.start_time.getHours()*12 + $scope.start_time.getMinutes()/5;
    }
    $scope.end_time_changed =function(){
        $scope.service_provider.day_end = $scope.end_time.getHours()*12 + $scope.end_time.getMinutes()/5;
    }
    $scope.uploadFiles = function($file,type){
        $upload.upload({
            url: "api/serviceprovider/"+$scope.service_provider.id+"/upload",
            file: $file
        }).progress(function(evt){
            console.log("percent: " + parseInt(100.0 * evt.loaded / evt.total))
        })
    }
    $scope.addSkills = function(skill){
      $scope.new_skills[skill] = [];
      $scope.service_provider.skills = $scope.new_skills
    }

  }]);
