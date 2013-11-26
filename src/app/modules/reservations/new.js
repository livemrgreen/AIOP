/**
 * Home controller definition
 * @scope Controllers
 */
define([
    'app'
], function(app) {
    'use strict';

    app.register.controller('NewReservationController', function($rootScope, $scope, $http, $filter, $location, LocalStorageService, UrlService, UserService) {

        var apiUrl = UrlService.urlNode;
        
        /*****************************************************************************
         *      Functions used by Metis to change view and logout
         *****************************************************************************/
        $scope.classReservations = '';
        $scope.moduleManager = UserService.isModuleManager();
        $scope.open = function() {
            var $icon = $('#accordion-toggle').children('span').children('i');
            //open or close submenu of reservation
            if ($scope.classReservations === 'collapse') {
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

        $scope.firstName = UserService.getUser().teacher.first_name;
        $scope.lastName = UserService.getUser().teacher.last_name;
        if (UserService.getUser().administrator)
            $scope.administrator = 'Administrator';
        else
            $scope.administrator = '';
        if (UserService.getUser().teacher.module_manager)
            $scope.moduleManager = 'Module Manager';
        else
            $scope.moduleManager = '';
        $scope.todayDate = $filter('date')(new Date(), 'dd/MM/y');

        $scope.logout = function() {
            LocalStorageService.clear('user');
            UserService.initialize();
            $location.path('/login');
        };

        /***********************************************************************************
         *
         *          Function for reservation requests
         *
         ***********************************************************************************/
        $scope.showTeachings = false;
        $scope.showLessonType = false;
        $scope.showLesson = false;
        $scope.groups = [];
        $scope.charateristics = [];
        $scope.selectedCharacteristics = {
            ids: {}
        };
        $scope.timeSlots = [];
        $scope.lessonTypes = [];
        $scope.lessons = [];
        var teachings = [];

        $http({
            method: 'Get',
            url: apiUrl + '/groups',
            headers: {
                'Authorization': "Bearer " + UserService.getAccessToken() + ""
            }})
                .success(function(data) {
            $scope.groups = data.groups;
        })
                .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            //todo:trtaiter l'erreur
            console.log(status);
            console.log(data);
        });

        /**
         * Get Characteristics for a ROOM
         */
        $http({
            method: 'Get',
            url: apiUrl + '/characteristics',
            headers: {
                'Authorization': "Bearer " + UserService.getAccessToken() + ""
            }})
                .success(function(data) {
            $scope.charateristics = data.characteristics;
        }).
                error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            //todo:trtaiter l'erreur
            console.log(status);
            console.log(data);
        });

        /**
         * Get Time_slots for a reservation
         */
        $http({
            method: 'Get',
            url: apiUrl + '/time_slots',
            headers: {
                'Authorization': "Bearer " + UserService.getAccessToken() + ""
            }})
                .success(function(data) {
            angular.forEach(data.time_slots, function(value) {
                var start = value.start.split(':');
                var end = value.end.split(':');
                $scope.timeSlots.push({
                    concat: start[0] + 'h' + start[1] + ' - ' + end[0] + 'h' + end[1],
                    id: value.id
                });
            });
        }).
                error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            //todo:traiter l'erreur
            console.log(status);
            console.log(data);
        });

        /**
         * Get all subject available for a group (IG4 - IG5 ...)
         * @param group the group
         */
        $scope.getSubjectList = function(group) {

            //set all subfields invisible
            $scope.showTeachings = false;
            $scope.showLessonType = false;
            $scope.showLesson = false;
            $scope.lessonTypes = [];
            $scope.lessons = [];
            $scope.teachingValues = [];
            teachings = [];

            /**
             * Get all teachings available for a group
             */
            $http({
                method: 'Get',
                url: apiUrl + '/groups/' + group.id + '/available_teachings',
                headers: {
                    'Authorization': "Bearer " + UserService.getAccessToken() + ""
                }})
                    .success(function(data) {
                teachings = data;
                var tmp = [];
                angular.forEach(data.teachings, function(value, key) {
                    if (tmp.hasOwnProperty(value.lesson.subject.label) === false) {
                        tmp[value.lesson.subject.label] = new Array(value);
                    }
                    else {
                        tmp[value.lesson.subject.label].push(value);
                    }
                });
                for (var subject in tmp) {
                    $scope.teachingValues.push({name: subject, object: tmp[subject]});
                }

                //set next field visible
                $scope.showTeachings = true;
            }).
                    error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:traiter l'erreur
                console.log(status);
                console.log(data);
            });
        };


        /**
         *  Get all Lesson_types available for a subject ( example : TP, TD )
         * @param subject the subject
         */
        $scope.getLessonTypesList = function(subject) {

            //set all subfields invisible
            $scope.showLessonType = false;
            $scope.showLesson = false;
            $scope.lessonTypes = [];

            var tmp = [];
            angular.forEach(teachings.teachings, function(value) {
                if (value.lesson.subject.label.localeCompare(subject.name) === 0) {
                    if (tmp.hasOwnProperty(value.lesson.subject.label) === false) {
                        tmp[value.lesson.lesson_type.label] = new Array(value);
                    }
                    else {
                        tmp[value.lesson.lesson_type.label].push(value);
                    }
                }
            });
            for (var subject in tmp) {
                $scope.lessonTypes.push({name: subject, object: tmp[subject]});
            }

            //set next field visible
            $scope.showLessonType = true;
        };


        $scope.getLessonsList = function(type) {
            $scope.lessons = [];
            angular.forEach($scope.lessonTypes, function(value, key) {
                if (value.name.localeCompare(type.name) === 0) {
                    value.object.forEach(function(valueObject) {
                        $scope.lessons.push({name: valueObject.lesson.label, object: value});
                    });
                }
            });
            $scope.showLesson = true;
        };

        $scope.sendRequest = function() {

            var date = $('#datepicker').datepicker("getDate").toISOString();
            var request = {
                reservation_request:
                        {
                            date: date,
                            capacity: $scope.capacity,
                            time_slot_id: $scope.time.id,
                            teaching_id: $scope.lesson.object.object[0].id,
                            characteristics: [],
                            status: null
                        }
            };
            
            angular.forEach($scope.selectedCharacteristics.ids, function(value, key) {
                if (value) {
                    request.reservation_request.characteristics.push({id: key});
                }
            });

            console.log(request);
            $http({
                method: 'Post',
                url: apiUrl + '/reservation_requests',
                data: request,
                headers: {
                    'Authorization': "Bearer " + UserService.getAccessToken() + ""
                }})
                    .success(function(data) {
                console.log(data);
                $location.path('/');

            })
                    .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:traiter l'erreur
                console.log(status);
                console.log(data);
            });
        };
    });
});
