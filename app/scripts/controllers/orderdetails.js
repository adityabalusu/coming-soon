'use strict';

angular.module('geekValetLanding')
  .controller('OrderdetailsCtrl',['$scope','$routeParams','Api',function ($scope,routeParams,api) {
    
    api.allOrders.one(routeParams.orderid).get().then(function(response){
        $scope.orderdetails = response
        var sp_id = String(response.service_provider_id);
        var customer_id = String(response.service_user_id);
        api.allServiceProviders.one(sp_id).get().then(function(response){
            $scope.assignedSP = response
        })
        api.allServiceUsers.one(customer_id).get().then(function(response){
            $scope.customer = response
        })
    })
  }]);
