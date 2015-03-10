'use strict';

describe('Directive: timeSlots', function () {

  // load the directive's module
  beforeEach(module('geekValetLandingApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<time-slots></time-slots>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the timeSlots directive');
  }));
});
