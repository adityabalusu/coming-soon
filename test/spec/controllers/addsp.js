'use strict';

describe('Controller: AddspCtrl', function () {

  // load the controller's module
  beforeEach(module('geekValetLandingApp'));

  var AddspCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddspCtrl = $controller('AddspCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
