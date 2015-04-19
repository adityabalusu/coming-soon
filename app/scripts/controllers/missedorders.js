'use strict';

angular.module('geekValetLanding')
  .controller('MissedordersCtrl', ['$scope','Api',function ($scope,api) {
    $scope.center = {
          lat: 12.931,
          lng: 77.621,
          zoom: 12
        }
    $scope.markers=[]
    api.missedorder.getList().then(function(response){
      _.each(response,function(marker){
        $scope.markers.push({
            lat:marker.location[0],
            lng:marker.location[1]
        })
        })
    })
  }]);
