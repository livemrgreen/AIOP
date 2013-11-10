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
        'jQuery' : 'assets/lib/jquery.min',
        'localStorageModule' : 'assets/js/localStorageModule'
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
        },
        'localStorageModule': {
            deps: ['angular']
        }
    },

    deps: ['./bootstrap']

});

requirejs(['./app', 'angular'],
    function (services) {
        services.factory('LocalStorageService', [
            function () {
                return {
                    isSupported: function () {
                        try {
                            return 'localStorage' in window && window['localStorage'] !== null;
                        } catch (e) {
                            return false;
                        }
                    },
                    save: function (key, value) {
                        localStorage[key] = JSON.stringify(value);
                    },
                    fetch: function (key) {
                        return localStorage[key];
                    },
                    parse: function(value) {
                        return JSON.parse(value);
                    },
                    clear: function (key) {
                        localStorage.removeItem(key);
                    }
                };
            }
        ]);
    }
);

/*
 define Authentication function to find
 */
require(['./app', './config', 'angular'], function(app){

    app.run(function ($rootScope, $location, LocalStorageService) {

        /**
         * define user information saved in $rootScope
         * @type {{isLogged: boolean, access_token: string, user: string, id: string}}
         */
        $rootScope.userDetails= {
            isLogged: false,
            access_token: '',
            user: '',
            id: ''
        };

         // routes that don't need authentication
         // check if current location matches route
         var routeClean = function (route) {
            return route == '/login';
         };


        console.log(!routeClean($location.url()));
         $rootScope.$on('$routeChangeStart', function (event, next, current) {

             if(LocalStorageService.fetch('user') != null ){
                 $rootScope.userDetails = LocalStorageService.parse(LocalStorageService.fetch('user'));
             }

             // if route requires auth and user is not logged in
             if (!routeClean($location.url()) && !$rootScope.userDetails.isLogged) {
             // redirect back to login
                 $location.path('/login');
             }
             else if($location.url() == '/login' && $rootScope.userDetails.isLogged){
                 $location.path('/');
             }
             console.log("changement de path");
         });
    });
});