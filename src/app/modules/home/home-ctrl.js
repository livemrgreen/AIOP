/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('HomeController', function ($scope, $http, UserService) {

      console.log('Home');
      console.log(UserService);
      $scope.twoTimesTwo = 2 * 2;

  });
});
