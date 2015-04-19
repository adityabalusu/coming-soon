'use strict';

angular.module('geekValetLanding')
  .directive('timeRanges', ['Selectedtime', function (selectedTime) {
    return {
      templateUrl: 'views/timeranges.html',
      scope:true,
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        scope.$watch(function(){return selectedTime.getSelectedDate()},function(){
            if(selectedTime.getSelectedDate()){
              scope.ranges = JSON.parse(selectedTime.getSelectedDate()).timeslots;
            }

        })
        scope.fixed = attrs.fixed? true:false;
        scope.selectRange = function(){
          selectedTime.setSelectedRange(JSON.parse(scope.selected.timerange))
          
        }

      }
    };
  }]);
