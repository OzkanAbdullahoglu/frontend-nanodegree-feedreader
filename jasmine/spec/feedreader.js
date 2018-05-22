/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {

    //checking If allFeeds variable is defined and array is not empty
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    //checking If allFeeds all elements has an url property and not an empty url property
    it('has URL', function() {
      for (i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).toBeNonEmptyString();
      };
    });

    //checking If allFeeds all elements has a name property and not an empty name property
    it('has name', function() {
      for (i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).toBeNonEmptyString();
      };
    });
  });

  describe('The Menu', function() {

    //selecting element which class is  '.menu.hidden' is hiding slider menu by default.
    //checking If we have this class inside the dom by default.
    it('is hidden by default', function() {
      var getElement = $('body');
      expect(getElement).toHaveClass('menu-hidden');
    });

    //selecting body element 
    //selecting element which triggers slider menu on click
    //create a click to test If '.menu-hidden' class is removed and slider menu displays 
    //create a second click to test If '.menu-hidden' class is re-implement and slider menu hides
    it('show/hide functionality is working properly', function() {
      var getElement = $('body');
      var menuIcon = $('.menu-icon-link');
      var eventType = spyOnEvent('.menu-icon-link', 'click');
      menuIcon.click();
      expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
      expect(eventType).toHaveBeenTriggered();
      expect(getElement).not.toHaveClass('menu-hidden');
      menuIcon.click();
      expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
      expect(eventType).toHaveBeenTriggered();
      expect(getElement).toHaveClass('menu-hidden');
    });
  });

  describe('Initial Entries', function() {
    //selecting feeds in DOM
    var getFeeds = $('.feed');
    //to call loadFeed function to see If we get any feeds
    //we set a timeout because of asynchronous functions with 'done'
    beforeEach(function(done) {
      setTimeout(function() {
        loadFeed(0, done);
      }, 2000);
    });
    //expecting feeds implemented to the DOM after loadFeed function called
    it('have at least a single entry in the feed container', function(done) {
      expect(getFeeds.find('.entry').length).toBeGreaterThan(0);
      done();
    });
  });

  describe('New Feed Selection', function() {
    var getFeeds = $('.feed');
    //creating an array to collect feeds content 
    var feedHtml = [];
    beforeEach(function(done) {
      //we are calling loadFeed function twice 
      //we are pushing html content into feedHtml array to compare
      loadFeed(0, function() {
        feedHtml.push(getFeeds.html());
        loadFeed(1, function() {
          feedHtml.push(getFeeds.html());
          done();
        });
      });
    });
    //we expect all content has to be different , so we compare both html content eachother
    it('is working properly and all content changes', function(done) {
      expect(feedHtml[0]).not.toEqual(feedHtml[1]);
      done();
    });
  });
}());