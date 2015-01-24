'use strict';

angular.module('geekValetLanding')
  .controller('MainCtrl',['$scope','Api','ngDialog',function ($scope,api,ngDialog) {
       
       $scope.user = {};
       $scope.submit = function(){
         var postdata = {email:$scope.user.email,feedback:$scope.user.feedback}
         api.signUp.post(postdata);
       }

       $scope.openDialog = function(){
            var postdata = {email:$scope.user.email}
            api.signUp.post(postdata).then(function(response){
              ngDialog.open({
                template:'views/feedback.html',
                scope:$scope,
                showClose:false,
                className: 'ngdialog-theme-default'
              })      
            });
            
        }            
        

  }]);
