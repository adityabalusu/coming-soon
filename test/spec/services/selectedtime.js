'use strict';

describe('Service: selectedTime', function () {

  // load the service's module
  beforeEach(module('geekValetLandingApp'));

  // instantiate service
  var selectedTime;
  beforeEach(inject(function (_selectedTime_) {
    selectedTime = _selectedTime_;
  }));

  it('should do something', function () {
    expect(!!selectedTime).toBe(true);
  });

});
