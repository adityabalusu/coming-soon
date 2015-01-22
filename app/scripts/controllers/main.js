'use strict';

angular.module('geekValetLanding')
  .controller('MainCtrl',['$scope','Api','ngDialog',function ($scope,api,ngDialog) {
       
       $scope.user = {};
       $scope.openDialog = function(){
         ngDialog.open({
            template:'views/feedback.html',
            scope:$scope,
            showClose:false,
            className: 'ngdialog-theme-default'
         })
       }

       $scope.submit = function(){
            var postdata = {email:$scope.user.email,feedback:$scope.user.feedback}
            api.signUp.post(postdata);
        }            
        

  }]);
