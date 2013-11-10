/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('LoginController', function ($rootScope, $scope, $http, $location, LocalStorageService) {

        $scope.error = false;

        /*
        function capitalize( str){
            return str.replace(/^(.{1})(.*)$/,function(m,c,d){
                return c.toUpperCase()+d;
            });
        }*/

        /**
         * loginFunction
         */
        $scope.loginFuncion = function(){

            // creation of a user
            var user = {'username': $scope.user, 'password': $scope.pass};
            // call /signin on the server with the user
            $http({method: 'Post', url: 'http://162.38.113.210:8080/signin', data : user}).
                success(function(data) {
                    console.log(data);
                    $rootScope.userDetails.isLogged = true;
                    $rootScope.userDetails.access_token = data.access_token;
                    $rootScope.userDetails.user = data.user.person;
                    $rootScope.userDetails.id = data.user.id;

                    console.log($rootScope.userDetails);
                    LocalStorageService.save('user', $rootScope.userDetails);
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
