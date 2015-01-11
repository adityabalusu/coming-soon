'use strict';

describe('Service: helpText', function () {

  // load the service's module
  beforeEach(module('kyronTravelApp'));

  // instantiate service
  var helpText;
  beforeEach(inject(function (_helpText_) {
    helpText = _helpText_;
  }));

  it('should do something', function () {
    expect(!!helpText).toBe(true);
  });

});
