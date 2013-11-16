define([
    'angularAMD',
    'angular-route',
    'angular-calendar'
], function (angularAMD) {

    var app = angular.module("aiopApp", ['ngRoute', 'ui.calendar']);

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
    /*
     app.run(function ($rootScope, $location, LocalStorageService, UserService) {

     UserService.initialize();

     // routes that don't need authentication
     // check if current location matches route
     var routeClean = function (route) {
     return route == '/login';
     };

     $rootScope.$on('$routeChangeStart', function (event, next, current) {

     if(LocalStorageService.fetch('user') != null ){
     $rootScope.userDetails = LocalStorageService.parse(LocalStorageService.fetch('user'));
     }

     // if route requires auth and user is not logged in
     if (!routeClean($location.url()) && !$rootScope.userDetails.isLogged) {
     // redirect back to login
     //event.preventDefault()
     $location.path('/login');
     }
     else if($location.url() == '/login' && $rootScope.userDetails.isLogged){
     //event.preventDefault()
     $location.path('/');
     }

     });
     });
     */
    angularAMD.bootstrap(app);
    return app;
});