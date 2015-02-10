'use strict';

angular.module('geekValetLanding')
  .controller('MainCtrl',['$scope','Api','ngDialog',function ($scope,api,ngDialog) {
    
    $scope.user = {};
    $scope.placeholdertext = 'Sign up now and your first job will be on us.'
    $scope.submit = function(){
        var postdata = {email:$scope.user.email,feedback:$scope.user.feedback}
        api.signUp.post(postdata).then(function(response){
          $scope.submitted = true;
          $scope.submittedFeedback = true;
        });
    }
    $scope.onSignUpFocus=function(){
      $scope.placeholdertext='Your email id here'
    }
    $scope.onSignUpBlur=function(){
      $scope.placeholdertext='Sign up now and your first job will be on us.'
    }
     $scope.openDialog = function(){
        var postdata = {email:$scope.user.email}
        $scope.submittedFeedback = false;
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
