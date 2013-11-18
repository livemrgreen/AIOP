/**
 * Home controller definition
 * @scope Controllers
 */
define([
    'app'
], function(app) {
    'use strict';

    app.register.controller('LoginController', function($rootScope, $scope, $http, $location, LocalStorageService, UserService) {

        $scope.error = false;
        /**
         * loginFunction
         */
        $scope.loginFuncion = function() {


            // Create a User for sign in request
            var user = {'username': $scope.user, 'password': $scope.pass};

            // call /signin on the server with the user
            $http({method: 'Post', url: 'http://162.38.113.210:8080/signin', data: user}).
                    success(function(data) {

                //Set user information
                UserService.setLogged();
                UserService.setAccessToken(data.access_token);
                UserService.setUser(data.user);
                UserService.setId(data.user.id);

                //save user in LocalStorage
                LocalStorageService.save('user', $rootScope.userDetails);

                //redirect to home page
                $location.path("/");
            }).
                    error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.error = true;
            });
        };
    });
});
