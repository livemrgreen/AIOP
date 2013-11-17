/**
 * Home controller definition
 * @scope Controllers
 */
define([
    'app'
], function(app) {
    'use strict';

    app.register.controller('ReservationController', function($rootScope, $scope, $http, $filter, $location, LocalStorageService, UserService) {

        $scope.open = function() {

            var $icon = $('.accordion-toggle').children('span').children('i');
            //open or close submenu of reservation
            if ($scope.classReservations == 'collapse') {
                //change arrow value of Reservations
                $icon.removeClass('fa fa-angle-left').addClass('fa fa-angle-down');
                $scope.classReservations = '';
            }
            else {
                $icon.removeClass('fa fa-angle-down').addClass('fa fa-angle-left');
                $scope.classReservations = 'collapse';
            }
        };

        //define datepiker
        $(function() {
            $("#datepicker").datepicker().datepicker({minDate: -1, maxDate: -2}).attr('readonly', 'readonly');
        });

        $scope.changeLocation = function(view) {
            $location.path('/' + view);
        };

        $scope.firstName = UserService.getUser().first_name;
        $scope.lastName = UserService.getUser().last_name;
        $scope.todayDate = $filter('date')(new Date(), 'dd/MM/y');

        $scope.logout = function() {
            LocalStorageService.clear('user');
            UserService.initialize();
            $location.path('/login');
        };

        $scope.ues = [
            {name: 'Programmation Web'},
            {name: 'Communication'},
            {name: 'Gestion'},
            {name: 'Base de données'},
            {name: 'Réseaux'}
        ];

        $http({method: 'Get', url: 'http://162.38.113.210:8080/modules', headers: {'Authorization': "Bearer " + UserService.getAccessToken() + ""}}).
            success(function(data) {
                //todo:set ues with received data
                console.log('success');
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(status);
                console.log(data);
            });

        $scope.getLessonsList = function(ue) {
            //TODO: retrieve lessonList according to ue provided
            console.log(ue);
            if (ue.name === "Programmation Web") {
                $scope.lessons = [
                    {name: 'CSS'},
                    {name: 'PHP'},
                    {name: 'JavaScript'},
                    {name: 'HTML5'}
                ];
            }
            else {
                $scope.lessons = [
                    {name: 'Cours chiant 1'},
                    {name: 'Cours chiant 2'},
                    {name: 'Cours méga chiant'},
                    {name: 'Ester'}
                ];
            }
        };
    });
});
