'use strict';

angular.module('geekValetLanding')
  .service('Selectedtime', function Selectedtime() {
    var selectedDate,selectedrange;
    return {
        setSelectedDate:function(timerange){
            selectedDate = timerange;
        },
        getSelectedDate:function(){
            return selectedDate;
        }

    }
  });
