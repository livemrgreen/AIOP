define([
    'angularAMD',
    'angular-route',
    'angular-calendar',
    'bootstraps'
], function (angularAMD) {

    var app = angular.module("aiopApp", ['ngRoute', 'ui.calendar', 'ui.bootstrap.modal']);

    app.config(function ($routeProvider) {
        $routeProvider.when("/", angularAMD.route({
                templateUrl: 'modules/home/home.html',
                controller: 'HomeController',
                controllerUrl: 'modules/home/home-ctrl'
            }))
            .when("/login", angularAMD.route({
                templateUrl: 'modules/login/login.html',
                controller: 'LoginController',
                controllerUrl: 'modules/login/login-ctrl'
            }))
            .when("/reservation", angularAMD.route({
                templateUrl: 'modules/reservation/reservation.html',
                controller: 'ReservationController',
                controllerUrl: 'modules/reservation/reservation-ctrl'
            }))
            .when("/see-reservations", angularAMD.route({
                templateUrl: 'modules/reservation/see-reservation.html',
                controller: 'ReservationController',
                controllerUrl: 'modules/reservation/see-reservation-ctrl'
            }))
            .when("/admin-reservation", angularAMD.route({
                templateUrl: 'modules/admin/see-reservation.html',
                controller: 'AdminReservationController',
                controllerUrl: 'modules/admin/see-reservation-ctrl'
            }))
            .when("/admin-calendar", angularAMD.route({
                templateUrl: 'modules/admin/see-calendar.html',
                controller: 'AdminCalendarController',
                controllerUrl: 'modules/admin/see-calendar-ctrl'
            }))
            .otherwise({
                redirectTo: '/'
            });
    });


    app.factory( 'UserService', ['$rootScope', function($rootScope){
        var loginService = {

            initialize : function(){
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

            },
            setLogged : function(){
                $rootScope.userDetails.isLogged = true;

            },
            setId : function(id){
                $rootScope.userDetails.id = id;
            },
            setAccessToken : function(token){
                $rootScope.userDetails.access_token = token;
            },
            setUser : function(user){
                $rootScope.userDetails.user = user;
            },
            getLogged : function(){
                return $rootScope.userDetails.isLogged;

            },
            getId : function(){
                return $rootScope.userDetails.id;
            },
            getAccessToken : function(){
                return $rootScope.userDetails.access_token;
            },
            getUser : function(){
                return $rootScope.userDetails.user;
            },
            isAdmin: function(){
                return true;
                //return $rootScope.userDetails.user.teacher.module_manager;
            }


        };

        return loginService;

    }]);

    app.factory('LocalStorageService', [
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

    app.run(function ($rootScope, $location, LocalStorageService, UserService) {

        UserService.initialize();

        // routes that don't need authentication
        // check if current location matches route
        var routeClean = function (route) {
            return route == '/login';
        };

        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            event.preventDefault();

            if(LocalStorageService.fetch('user') != null ){
                $rootScope.userDetails = LocalStorageService.parse(LocalStorageService.fetch('user'));
            }

            // if route requires auth and user is not logged in
            if (!routeClean($location.url()) && !UserService.getLogged()) {
                // redirect back to login
                //event.preventDefault()
                $location.path('/login');
            }
            else if($location.url() == '/login' && UserService.getLogged()){
                //event.preventDefault()
                $location.path('/');
            }
            else if($location.url() == '/admin-calendar' && UserService.getLogged() && !UserService.isAdmin()){
                //event.preventDefault()
                $location.path('/');
            }
            else if($location.url() == '/admin-reservation' && UserService.getLogged() && !UserService.isAdmin()){
                //event.preventDefault()
                $location.path('/');
            }

        });
    });

    angularAMD.bootstrap(app);
    return app;
});