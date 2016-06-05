'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /theButton when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/theButton");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#!/theButton');
    });


    it('should render theButton when user navigates to /theButton', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('simpleWires', function() {

    beforeEach(function() {
      browser.get('index.html#!/simpleWires');
    });


    it('should render simpleWires when user navigates to /simpleWires', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
