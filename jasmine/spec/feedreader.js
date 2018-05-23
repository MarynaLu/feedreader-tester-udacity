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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('contains valid urls', function(){
            for(let i=0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(" ");
            };
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('contains valid feed names', function(){
            for(let i=0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(" ");
            };
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
         /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('hidden by default', function(){
            //test if by default the body tag has a class '.menu-hidded', which is responsible for hiding the menu
            var theBodyClass = $('body').hasClass('menu-hidden');
            expect(theBodyClass).toBeTruthy();
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('is displayed when clicked', function(){
            //similate the click on the menu icon
            $('.menu-icon-link').click();

            //check the class of the body tag after the click
            var theBodyClassAfterClick = $('body').hasClass('menu-hidden');
            expect(theBodyClassAfterClick).toBeFalsy();
        });

        it('is hidden when clicked a second time', function(){
             //similate the click on the menu icon second time
            $('.menu-icon-link').click();

            //check the class of the body tag after the click
            var theBodyClassAfter2Click = $('body').hasClass('menu-hidden');
            expect(theBodyClassAfter2Click).toBeTruthy();
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    describe('Initial Entries', function(){

        //run loadFeed() function before the test suite is loaded
        beforeEach(function(done){
                loadFeed(0, function(){
                    done();
                });
            });

        
        it('are loaded after the loadFeed function is called', function(done){
            //check whether at least a single element has both classes .entry and .feed (signifies that the feed is not empty)
            expect($('.entry .feed')).toBeTruthy();
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function(){
        var firstEntryBefore, firstEntryAfter;

         /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        beforeEach(function(done){
            var theFeed =  $('.feed');
            //remove previous entries from the feed
            theFeed.empty();

            //run the load function and store the first child of the feed in firstEntryBefore variable
            loadFeed(0, function(){
                firstEntryBefore = theFeed.first();
                done();
            });

            //run the load function second time and store the first child of the feed in firstEntryAfter variable
            loadFeed(1, function(){
                firstEntryAfter = theFeed.first();
                done();
            });
        });

        //test whether the first element in the feed is different (after running loadFeed() twice)
        it('new feed differs from the previous one', function(){
            expect(firstEntryBefore).not.toBe(firstEntryAfter);
        });
    });
}());
