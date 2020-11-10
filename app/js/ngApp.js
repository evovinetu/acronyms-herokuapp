/**
 * Created by evo on 2017.03.04.
 */


// ANGULAR START ////////////////////////////////////////////////////////

(function() {  // to keep the variable ngApp local

    // run AngularJS
    var ngApp = angular.module("ngApp", ['ui.router','ngAnimate','ui.bootstrap']);


    ngApp.config(function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

        var myPath = '/';

        //make trailing slash optional for all routes
        $urlMatcherFactoryProvider.strictMode(false);

        // For any unmatched url, redirect to state '1'
        $urlRouterProvider.otherwise("/");          //disabled for testing - FIX THIS!

        $stateProvider
            .state('search', {
                url: '/', 
                templateUrl: '/html/search.html',
                controller: 'SearchCtrl'
            })
            .state('add', {
                url: '/add',
                templateUrl: 'html/add.html',
                controller: 'AddCtrl'
            })
    });

    // enable html 5 to get rid of hashtag - needs <base href="/"> in index.html <head>
    ngApp.config(["$locationProvider", function($locationProvider) {
        // if true, removes # from URL and URL doesn't change
        $locationProvider.html5Mode(false);

        // removes ! from URL
        $locationProvider.hashPrefix('');
    }]);

    // configure the $animate service - ONLY ELEMENTS WITH CLASS 'animated' check and process with angular-animate
    ngApp.config(
        function configureAnimate( $animateProvider ) {
            // By default, the $animate service will check for animation styling
            // on every structural change. This requires a lot of animateFrame-based
            // DOM-inspection. However, we can tell $animate to only check for
            // animations on elements that have a specific class name RegExp pattern
            // present. In this case, we are requiring the "animated" class.
            // --
            // NOTE: I have personally seen a performance boost using this approach
            // on some complex page. The AngularJS documentation also says that
            // this can also be really beneficial for low-powered mobile devices,
            // but I don't do much mobile.
            $animateProvider.classNameFilter( /\banimated\b/ );
        }
    );

}());
