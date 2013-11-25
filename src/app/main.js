/*global require*/
'use strict';

/**
 *  define JS file path
 */

require.config({
    paths: {
        'jquery' : 'bower_components/jquery/jquery.min',
        'jquery-ui' : 'bower_components/jquery-ui/ui/minified/jquery-ui.min',
        'angular': 'bower_components/angular/angular.min',
        'angularAMD': 'bower_components/angularAMD/angularAMD.min',
        'angular-route': 'bower_components/angular-route/angular-route.min',
        'angular-calendar': 'bower_components/angular-ui-calendar/src/calendar',
        'metis' : 'assets/js/main',
        'fullcalendar': 'bower_components/fullcalendar/fullcalendar',
        'bootstraps' : 'bower_components/angular-bootstrap/ui-bootstrap.min'
    },
    shim: {
        'bootstraps' : ['jquery'],
        'angularAMD': ['jquery', 'metis', 'angular'],
        'angular-route': ['angular'],
        'angular-calendar' : ['jquery', 'jquery-ui', 'angular' ,'fullcalendar'],
        'metis': ['jquery', 'jquery-ui']
    },
    deps: ['app']
});


///**
// * LocalStorage Service
// * To use, add "LocalStorageService" in params of the function
// */
///*requirejs(['./app'],
//    function (services) {
//        services.factory('LocalStorageService', [
//            function () {
//                return {
//                    isSupported: function () {
//                        try {
//                            return 'localStorage' in window && window['localStorage'] !== null;
//                        } catch (e) {
//                            return false;
//                        }
//                    },
//                    save: function (key, value) {
//                        localStorage[key] = JSON.stringify(value);
//                    },
//                    fetch: function (key) {
//                        return localStorage[key];
//                    },
//                    parse: function(value) {
//                        return JSON.parse(value);
//                    },
//                    clear: function (key) {
//                        localStorage.removeItem(key);
//                    }
//                };
//            }
//        ]);
//    }
//);
//
//
///**
// * UserService
// */
//requirejs(['./app'], function(service){
//
//    service.factory( 'UserService', ['$rootScope', function($rootScope){
//        var loginService = {
//
//            initialize : function(){
//                /**
//                 * define user information saved in $rootScope
//                 * @type {{isLogged: boolean, access_token: string, user: string, id: string}}
//                 */
//                $rootScope.userDetails= {
//                    isLogged: false,
//                    access_token: '',
//                    user: '',
//                    id: ''
//                };
//
//            },
//            setLogged : function(){
//                $rootScope.userDetails.isLogged = true;
//
//            },
//            setId : function(id){
//                $rootScope.userDetails.id = id;
//            },
//            setAccessToken : function(token){
//                $rootScope.userDetails.access_token = token;
//            },
//            setUser : function(user){
//                $rootScope.userDetails.user = user;
//            }
//
//
//        };
//
//        return loginService;
//
//    }]);
//});
//
//
///*
// define Authentication function to find
// */
//require(['./app'], function(app){
//
//    app.run(function ($rootScope, $location, LocalStorageService, UserService) {
//
//        UserService.initialize();
//
//        // routes that don't need authentication
//        // check if current location matches route
//        var routeClean = function (route) {
//            return route == '/login';
//        };
//
//
//        console.log(!routeClean($location.url()));
//        $rootScope.$on('$routeChangeStart', function (event, next, current) {
//
//            if(LocalStorageService.fetch('user') != null ){
//                $rootScope.userDetails = LocalStorageService.parse(LocalStorageService.fetch('user'));
//            }
//
//            // if route requires auth and user is not logged in
//            if (!routeClean($location.url()) && !$rootScope.userDetails.isLogged) {
//                // redirect back to login
//                //event.preventDefault()
//                $location.path('/login');
//            }
//            else if($location.url() == '/login' && $rootScope.userDetails.isLogged){
//                //event.preventDefault()
//                $location.path('/');
//            }
//
//        });
//    });
//});
