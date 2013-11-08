/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('LoginController', function ($scope, $http, $location, UserService) {

        $scope.error = false;

        $scope.loginFuncion = function(){

            var user = {'username': $scope.user, 'password': $scope.pass};
            $http({method: 'Post', url: 'http://162.38.113.210:8080/signin', data : user}).
                success(function(data) {
                    UserService.isLogged = true;
                    UserService.access_token = data.access_token;
                    console.log(UserService);
                    $location.path("/");
                    // this callback will be called asynchronously
                    // when the response is available
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.error = true;
                });
        }
    });
});
