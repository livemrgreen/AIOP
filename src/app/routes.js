/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['app'], function (app) {
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

    //$locationProvider.html5Mode(true);
  });
});

