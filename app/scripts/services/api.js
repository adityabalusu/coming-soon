'use strict';

angular.module('geekValetLanding')
  .service('Api', ['Restangular',function Api(Restangular) {
       var signUp,getTimeslots;
       return{
           signUp: Restangular.all('signup'),
           getTimeSlots: Restangular.all('search/slots/service/'),
           order:Restangular.all('order/'),
           user:Restangular.one('user'),
           missedorder:Restangular.all('missedorder'),
           allServiceProviders:Restangular.all('admin/serviceprovider'),
           allOrders:Restangular.all('admin/order')
         }
  }]);
