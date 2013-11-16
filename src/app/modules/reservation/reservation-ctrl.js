/**
 * Home controller definition
 * @scope Controllers
 */
define([
    'app'
], function (app) {
    'use strict';

    app.register.controller('ReservationController', function ($rootScope, $scope, $http, $filter, $location, LocalStorageService, UserService) {
        console.log($rootScope);
        $scope.open = function(){

            var $icon = $('.accordion-toggle').children('span').children('i');
            //open or close submenu of reservation
            if($scope.classReservations == 'collapse'){
                //change arrow value of Reservations
                $icon.removeClass('fa fa-angle-left').addClass('fa fa-angle-down');
                $scope.classReservations = '';
            }
            else{
                $icon.removeClass('fa fa-angle-down').addClass('fa fa-angle-left');
                $scope.classReservations = 'collapse';
            }
        };

        //define datepiker
        $(function() {
            $( "#datepicker" ).datepicker().datepicker({minDate:-1,maxDate:-2}).attr('readonly','readonly');
        });

        $scope.changeLocation = function(view){
            $location.path('/'+view);
        };
        $scope.firstName = $rootScope.userDetails.user.first_name;
        $scope.lastName = $rootScope.userDetails.user.last_name;
        $scope.todayDate = $filter('date')(new Date(), 'dd/MM/y');

        $scope.logout = function(){
            LocalStorageService.clear('user');
            UserService.initialize();
            $location.path('/login');
        }
        $scope.module = {name:'test'};


    });
});
