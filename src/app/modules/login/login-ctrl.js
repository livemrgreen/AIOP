/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('LoginController', function ($scope, $http, $location) {

        $scope.error = false;

        $scope.loginFuncion = function(){

            var user = {'username': $scope.user, 'password': $scope.pass};
            $http({method: 'Post', url: 'http://162.38.113.210:8080/signin', data : user}).
                success(function(data) {
                    console.log(data);
                    console.log("bon");
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
