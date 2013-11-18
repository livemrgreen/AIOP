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
                console.log(data);
                $scope.groups = data;
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:trtaiter l'erreur
                console.log(status);
                console.log(data);
            });

        $scope.charateristics =[];
        $scope.selectedCharacteristics = [];
        //get groups
        $http({method: 'Get', url: 'http://162.38.113.210:8080/characteristics', headers: {'Authorization': "Bearer " + UserService.getAccessToken() + ""}}).
            success(function (data) {
                //todo:set ues with received data
                console.log("chara");
                console.log(data);
                $scope.charateristics = data.characteristics;

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
                //todo:traiter l'erreur
                console.log(status);
                console.log(data);
            });


        $scope.showTeachings = false;
        var teachings = [];
        $scope.getSubjectList = function (group) {
            $scope.teachingValues = [];
            $scope.showTeachings = false;
            $http({method: 'Get', url: 'http://162.38.113.210:8080/groups/'+ group.id+'/teachings_available', headers: {'Authorization': "Bearer " + UserService.getAccessToken() + ""}}).
                success(function (data) {
                    teachings = data;
                    var tmp = [];
                    angular.forEach(data.teachings, function (value, key) {
                        if(tmp.hasOwnProperty(value.lesson.subject.label) == false){
                            tmp[value.lesson.subject.label]=new Array(value);
                        }
                        else{
                            tmp[value.lesson.subject.label].push(value);
                        }
                    });

                    for (var subject in tmp){
                        $scope.teachingValues.push({name : subject, object:tmp[subject]});
                    };
                    console.log($scope.teachingValues);
                    $scope.showTeachings = true;
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(status);
                    console.log(data);
                });
        };

        $scope.lessonTypes = [];
        $scope.getLessonTypesList = function (lesson) {
            //TODO: retrieve lessonList according to ue provided
            var tmp = [];
            angular.forEach(teachings.teachings, function (value, key) {
                if(value.lesson.subject.label.localeCompare(lesson.name) == 0){
                    if(tmp.hasOwnProperty(value.lesson.subject.label) == false){
                        tmp[value.lesson.lesson_type.label]=new Array(value);
                    }
                    else{
                        tmp[value.lesson.lesson_type.label].push(value);
                    }
                }
            });

            for (var subject in tmp){
                $scope.lessonTypes.push({name : subject, object:tmp[subject]});
            };
            console.log('fin');
            console.log($scope.lessonTypes);
        };

        $scope.lessons = [];
        $scope.getLessonsList = function(type){
            angular.forEach($scope.lessonTypes, function (value, key) {
                if(value.name.localeCompare(type.name) == 0){
                    value.object.forEach(function(valueObject){
                        $scope.lessons.push({name : valueObject.lesson.label, object: value});
                    });
                }
            });
        };



    });
});
