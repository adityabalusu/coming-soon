'use strict';

angular.module('geekValetLanding')
  .controller('OrderCtrl', ['$scope','Selectedtime',function ($scope,selectedTime) {
    $scope.skill = selectedTime.getSelectedSkill()
    $scope.selectedrange = selectedTime.getSelectedRange()

  }]);
