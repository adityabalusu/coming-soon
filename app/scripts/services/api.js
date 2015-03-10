'use strict';

angular.module('geekValetLanding')
  .service('Api', ['Restangular',function Api(Restangular) {
       var signUp,getTimeslots;
       return{
           signUp: Restangular.all('signup'),
           getTimeSlots: Restangular.one('search/slots/service/laundry/').get()
           

       }
  }]);
