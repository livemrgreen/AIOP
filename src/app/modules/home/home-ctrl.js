/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('HomeController', function ($scope, $http) {
    $scope.twoTimesTwo = 2 * 2;
  });
});
