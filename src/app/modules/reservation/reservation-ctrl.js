/**
 * Home controller definition
 * @scope Controllers
 */
define([
    'app'
], function (app) {
    'use strict';

    app.register.controller('ReservationController', function ($rootScope, $scope, $http, $filter, $location, LocalStorageService, UserService) {

        $scope.open = function () {

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
        $(function () {
            $("#datepicker").datepicker().datepicker({minDate: -1, maxDate: -2}).attr('readonly', 'readonly');
        });

        $scope.changeLocation = function (view) {
            $location.path('/' + view);
        };

        $scope.firstName = UserService.getUser().teacher.first_name;
        $scope.lastName = UserService.getUser().teacher.last_name;
        $scope.todayDate = $filter('date')(new Date(), 'dd/MM/y');

        $scope.logout = function () {
            LocalStorageService.clear('user');
            UserService.initialize();
            $location.path('/login');
        };

        $scope.groups = [];

        //get groups
        $http({method: 'Get', url: 'http://162.38.113.210:8080/groups', headers: {'Authorization': "Bearer " + UserService.getAccessToken() + ""}}).
            success(function (data) {
                //todo:set ues with received data
                angular.forEach(data.groups, function (value, key) {
                    $scope.groups.push({name: value.label, id: value.id});
                });
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:trtaiter l'erreur
                console.log(status);
                console.log(data);
            });

        $scope.timeSlots= [];
        //get times_slots
        $http({method: 'Get', url: 'http://162.38.113.210:8080/time_slots', headers: {'Authorization': "Bearer " + UserService.getAccessToken() + ""}}).
            success(function (data) {
                angular.forEach(data.time_slots, function (value, key) {
                    var start = value.start.split(':');
                    var end = value.end.split(':');
                    $scope.timeSlots.push({concat: start[0]+'h'+start[1]+' - '+end[0]+'h'+end[1], id: value.id});
                });
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:trtaiter l'erreur
                console.log(status);
                console.log(data);
            });

        $scope.teachingValues = new Array();
        $scope.getLessonList = function (group) {
            $http({method: 'Get', url: 'http://162.38.113.210:8080/groups/'+ group.id+'/teachings', headers: {'Authorization': "Bearer " + UserService.getAccessToken() + ""}}).
                success(function (data) {
                    //todo:set ues with received data
                    console.log('success');
                    console.log(data);

                    var tmp = Object.create(null);
                    angular.forEach(data.teachings, function (value, key) {
                        $scope.teachingValues[value.subject.label]=new Array();
                    });

                    angular.forEach(data.teachings, function (value, key) {
                        $scope.teachingValues[value.subject.label].push({subject: value.subject.label, type: value.subject.lessonType})
                    });
                    console.log($scope.teachingValues);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(status);
                    console.log(data);
                });
        };

        $scope.getLessonsList = function (ue) {
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
