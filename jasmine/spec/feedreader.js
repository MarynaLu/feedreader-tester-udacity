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
        /* This test is to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('contains valid urls', function(){
            for(let i=0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            };
        });
        /* This test loops through each feed
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

    
    describe('The menu', function(){
         /* This test ensures the menu element is
         * hidden by default.
         */

        it('hidden by default', function(){
            //test if by default the body tag has a class '.menu-hidded', which is responsible for hiding the menu
            var theBodyClass = $('body').hasClass('menu-hidden');
            expect(theBodyClass).toBeTruthy();
        });

        /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          */

        it('changes visibility when clicked', function(){
            //similate the click on the menu icon
            $('.menu-icon-link').click();

            //check the class of the body tag after the click
            var theBodyClassAfterClick = $('body').hasClass('menu-hidden');
            expect(theBodyClassAfterClick).toBe(false);
    
            //simulate the second click on the menu icon
            $('.menu-icon-link').click();

            //check the class of the body tag after the click
            var theBodyClassAfter2Click = $('body').hasClass('menu-hidden');
            expect(theBodyClassAfter2Click).toBe(true);
        });
    });

        
    describe('Initial Entries', function(){
        /* This test ensures when the loadFeed()
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

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
        var oldFeed, newFeed;

         /* This test ensures when a new feed is loaded
         * by the loadFeed() function that the content actually changes.
         */

        beforeEach(function(done){
            //remove previous entries from the feed
            $('.feed').empty();

            //run the load function and store the first child of the feed in firstEntryBefore variable
            loadFeed(0, function(){
                oldFeed = document.querySelector(".feed").innerHTML;
        
            //run the load function second time and store the first child of the feed in firstEntryAfter variable
                loadFeed(1, function(){
                    newFeed = document.querySelector(".feed").innerHTML;
                    done();

                });
            });
        });

        //test whether the first element in the feed is different (after running loadFeed() twice)
        it('new feed differs from the previous one', function(){
            expect(oldFeed).not.toBe(newFeed);
        });
    });
}());
