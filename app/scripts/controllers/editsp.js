'use strict';

angular.module('geekValetLanding')
  .controller('EditspCtrl',['$scope','$routeParams','Api','$upload',function ($scope,routeParams,api,$upload) {
    api.admin.one('serviceprovider',routeParams.spid).get().then(function(response){
        $scope.service_provider = response
    })
    
    $scope.editServiceProvider = function(){
        $scope.service_provider.save().then(function(response){
            location.url('admin')
        })
    }
    $scope.uploadFiles = function($file,type){
        $upload.upload({
            url: "api/serviceprovider/"+$scope.service_provider.id+"/upload",
            file: $file
        }).progress(function(evt){
            console.log("percent: " + parseInt(100.0 * evt.loaded / evt.total))
        })
    }

  }]);
