/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('LoginController', function ($scope, $http, $location, UserService) {

        $scope.error = false;

        function capitalize( str){
            return str.replace(/^(.{1})(.*)$/,function(m,c,d){
                return c.toUpperCase()+d;
            });
        }

        /**
         * loginFunction
         */
        $scope.loginFuncion = function(){

            // creation of a user
            var user = {'username': $scope.user, 'password': $scope.pass};
            // call /signin on the server with the user
            $http({method: 'Post', url: 'http://162.38.113.210:8080/signin', data : user}).
                success(function(data) {
                    UserService.isLogged = true;
                    UserService.access_token = data.access_token;
                    UserService.name = capitalize(data.user.username);
                    UserService.id = data.user.id;
                    $location.path("/");
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.error = true;
                });
        }
    });
});
