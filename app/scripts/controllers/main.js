'use strict';

angular.module('geekValetLanding')
  .controller('MainCtrl',['$scope','$anchorScroll','$location','Api','ngDialog','$document',function ($scope,$anchorScroll,$location,api,ngDialog,$document) {
    
    $scope.document = $document;
    $scope.user = {};
    $scope.placeholdertext = 'Sign up now.Your first job(upto Rs.300) will be on us.'

    $scope.scrollTo = function(id,offset){
      var element = $('#'+id);
      $scope.document.duScrollToElement(element,offset,1000,TWEEN.Easing.Quadratic.Out)

    }

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
      $scope.placeholdertext='Sign up now and your first job(upto Rs.300) will be on us.'
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
