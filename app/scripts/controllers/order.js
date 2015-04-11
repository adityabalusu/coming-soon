'use strict';

angular.module('geekValetLanding')
  .controller('OrderCtrl',['$scope','Api','ngDialog', function ($scope,api,ngDialog) {
    
    $scope.moment = moment;
    api.allOrders.getList().then(function(orders){
        $scope.orders = orders
    })
    $scope.openAssignmentDialog = function(order){
        $scope.assigned = {};
        $scope.orderAssigned = false;
        $scope.orderToAssign = order;
        var assignmentDialog = ngDialog.open({
              template:'views/assignOrder.html',
              scope:$scope,
              className: 'ngdialog-theme-default'
            });
    }
    $scope.assignOrder =function(){
        var sp_phone_number = {"phone_number":$scope.assigned.phone_number}
        $scope.orderToAssign.post('assign',sp_phone_number).then(function(){
            $scope.orderAssigned = true;
            api.allOrders.getList().then(function(orders){
                $scope.orders = orders
            })
        })
    }
    $scope.changeStatus =function(order,new_status){
        order.one('status').post(new_status).then(function(){
            $scope.orderAssigned = true;
            api.allOrders.getList().then(function(orders){
                $scope.orders = orders
            })
        })
    }
  }]);
