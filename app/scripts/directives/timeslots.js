'use strict';

angular.module('geekValetLanding')
  .directive('timeSlots',[ 'Selectedtime', function (selectedTime) {
    return {
      templateUrl: 'views/timeslots.html',
      scope:true,
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.selectSlot=function(){
            selectedTime.setSelectedDate(scope.selected.date)
        }



      }
    };
  }]);
