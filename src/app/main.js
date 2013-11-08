/*global require*/
'use strict';

/**
 *  define JS file path
 */
require.config({
    paths: {
        'domReady': 'assets/lib/requirejs-domready/domReady',
        'angular': 'bower_components/angular/angular',
        'moment': 'bower_components/moment/moment-with-langs.min',
        'main' : 'assets/js/main.js',
        'underscore' : 'bower_components/underscore/underscore-min',
        'jQuery' : 'assets/lib/jquery.min'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'underscore' : {
            exports: '_'
        },
        'angular': {
            exports: 'angular'
        }
    },

    deps: ['./bootstrap']

});

requirejs(['./app'], function(services){
    services.factory('UserService', [function() {
        var sdo = {
            isLogged: false,
            access_token: ''
        };
        return sdo;
    }]);
});

/*
 define Authentication function to find
 */
requirejs(['./app', './config', 'angular'], function(app){

    app.run(function ($rootScope, $location, UserService) {
        console.log(UserService);

        // routes that don't need authentication
         // check if current location matches route
         var routeClean = function (route) {
            return route == '/login';
         };


        console.log(!routeClean($location.url()));
         $rootScope.$on('$routeChangeStart', function (event, next, current) {

             console.log("roooouuutage");
             console.log(UserService);
         // if route requires auth and user is not logged in
            if (!routeClean($location.url()) && !UserService.isLogged) {
            // redirect back to login
                $location.path('/login');
            }
            console.log("changement de path");
         });
    });
});