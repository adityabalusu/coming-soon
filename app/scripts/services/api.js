'use strict';

angular.module('geekValetLanding')
  .service('Api', ['Restangular',function Api(Restangular) {
       var signUp;
       return{
           signUp: Restangular.all('signup'),
           update: Restangular.all('update')
           
       }
  }]);
