'use strict';

describe('Controller: MissedordersCtrl', function () {

  // load the controller's module
  beforeEach(module('geekValetLandingApp'));

  var MissedordersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MissedordersCtrl = $controller('MissedordersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
