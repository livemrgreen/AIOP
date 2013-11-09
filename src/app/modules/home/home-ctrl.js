/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('HomeController', function ($scope, $http, $filter,UserService) {

      console.log('Home');
      console.log(UserService);
      $scope.twoTimesTwo = 2 * 2;
      $scope.name = UserService.name;
      $scope.todayDate = $filter('date')(new Date(), 'dd/MM/y');

  });
});
