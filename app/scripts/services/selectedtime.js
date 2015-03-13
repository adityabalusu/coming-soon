'use strict';

angular.module('geekValetLanding')
  .service('Selectedtime', function Selectedtime() {
    var selectedDate,selectedrange,skill;
    return {
        setSelectedDate:function(timeslot){
            sessionStorage.selectedDate = timeslot;
        },
        getSelectedDate:function(){
            return sessionStorage.selectedDate;
        },
        setSelectedRange:function(timerange){
            debugger
            sessionStorage.selectedrange = angular.toJson(timerange);
        },
        getSelectedRange:function(){
            return angular.toJson(sessionStorage.selectedrange);
        },
        setSelectedSkill:function(selectedskill){
            sessionStorage.skill = selectedskill;
        },
        getSelectedSkill:function(){
            return angular.fromJson(sessionStorage.skill);
        }

    }
  });
