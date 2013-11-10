/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('HomeController', function ($rootScope, $scope, $http, $filter, $location, LocalStorageService) {
      $scope.twoTimesTwo = 2 * 2;
      $scope.firstName = $rootScope.userDetails.user.first_name;
      $scope.lastName = $rootScope.userDetails.user.last_name;
      $scope.todayDate = $filter('date')(new Date(), 'dd/MM/y');

      $http({method: 'Get', url: 'http://162.38.113.210:8080/users', headers : { 'Authorization': "Bearer "+$rootScope.userDetails.access_token+""}}).
          success(function(data) {
              console.log('success');
              console.log(data);
          }).
          error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              console.log(status);
              console.log(data);
          });

      $scope.logout = function(){
          LocalStorageService.clear('user');

          $rootScope.userDetails= {
              isLogged: false,
              access_token: '',
              user: '',
              id: ''
          };

          $location.path('/login');
      }

  });
});
