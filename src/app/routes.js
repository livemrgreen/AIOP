/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app', './config', 'underscore', 'angular'], function (app) {
  'use strict';
  app.config(function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'modules/home/home.html',
      controller : 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'modules/login/login.html',
        controller : 'LoginController'
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });

/*
  app.run(function ($rootScope, $location, AuthenticationService) {
      console.log("lancement run");
      // enumerate routes that don't need authentication
      var routesThatDontRequireAuth = ['/login'];
      // check if current location matches route
      var routeClean = function (route) {
          return _.find(routesThatDontRequireAuth,
              function (noAuthRoute) {
                  return _.str.startsWith(route, noAuthRoute);
              });
      };
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
          // if route requires auth and user is not logged in
          if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
              // redirect back to login
              $location.path('/login');
          }
      });
  });*/
    //$locationProvider.html5Mode(true);
  });
});
