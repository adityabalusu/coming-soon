'use strict';

angular.module('geekValetLanding')
  .directive('timeRanges', ['Selectedtime', function (selectedTime) {
    return {
      templateUrl: 'views/timeranges.html',
      scope:true,
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        scope.$watch(function(){return selectedTime.getSelectedDate()},function(){
            scope.ranges = JSON.parse(selectedTime.getSelectedDate()).timeslots;

        })

      }
    };
  }]);
