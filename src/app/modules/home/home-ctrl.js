/**
 * Home controller definition
 * @scope Controllers
 */
define([
    'app'
], function(app) {
    'use strict';

    app.register.controller('HomeController', function($rootScope, $scope, $http, $filter, $location, LocalStorageService, UserService, UrlService) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        var apiUrl = UrlService.urlNode;

        $scope.calendarName = '';

        /* event source that contains custom events on the scope */
        $scope.events = [
        ];

        $scope.groups = [];
        /**
         * Get all groups
         */
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

        $scope.teachers = [];
        /**
         * Get all groups
         */
        $http({method: 'Get', url: apiUrl + '/teachers', headers: {'Authorization': "Bearer " + UserService.getAccessToken() + ""}}).
                success(function(data) {
            $scope.teachers = data.teachers;
        })
                .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            //todo:trtaiter l'erreur
            console.log(status);
            console.log(data);
        });

        $http({
            method: 'Get',
            url: apiUrl + '/teachers/' + UserService.getUser().teacher.id + '/reservations',
            headers: {
                'Authorization': "Bearer " + UserService.getAccessToken() + ""
            }})
                .success(function(data) {
            $scope.calendarName = UserService.getUser().teacher.first_name + ' ' + UserService.getUser().teacher.last_name;

            angular.forEach(data.reservations, function(value, key) {
                var min = value.time_slot.start.split(':');
                min = min[1];
                var start = new Date(value.date);
                start.setHours(parseInt(value.time_slot.start));
                start.setMinutes(parseInt(min));
                var end = new Date(value.date);
                min = value.time_slot.end.split(':');
                min = min [1];

                end.setHours(parseInt(value.time_slot.end));
                end.setMinutes(parseInt(min));

                $scope.events.push({
                    title: value.teaching.lesson.subject.label + '\n' + value.teaching.group.label + ' ' + value.room.label,
                    start: start,
                    end: end,
                    allDay: false
                });
            });
        })
                .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(status);
            console.log(data);
        });

        $scope.classReservations = 'collapse';
        $scope.admin = UserService.isAdmin();
        $scope.open = function(div) {
            if (div === 'admin') {
                var $icon = $('#accordion-toggle-admin').children('span').children('i');
                //open or close submenu of reservation
                if ($scope.classReservationsAdmin === 'collapse') {
                    //change arrow value of Reservations
                    $icon.removeClass('fa fa-angle-left').addClass('fa fa-angle-down');
                    $scope.classReservationsAdmin = '';
                }
                else {
                    $icon.removeClass('fa fa-angle-down').addClass('fa fa-angle-left');
                    $scope.classReservationsAdmin = 'collapse';
                }
            }
            else {
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
            }
        };

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

        /* alert on eventClick */
        $scope.alertEventOnClick = function(date, allDay, jsEvent, view) {
            $scope.$apply(function() {
                $scope.alertMessage = ('Day Clicked ' + date);
            });
        };
        /* alert on Drop */
        $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
            $scope.$apply(function() {
                $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
            });
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
            $scope.$apply(function() {
                $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
            });
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function(value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
                sources.push(source);
            }
        };

        /* remove event */
        $scope.remove = function(index) {
            $scope.events.splice(index, 1);
        };

        /* Change View */
        $scope.changeView = function(view, calendar) {
            calendar.fullCalendar('changeView', view);
        };

        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 550,
                editable: false,
                header: {
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                minTime: '8:00',
                defaultView: 'agendaWeek',
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.events];


        $scope.getGroupCalendar = function(group) {
            $http({
                method: 'Get',
                url: apiUrl + '/groups/' + group.id + '/reservations',
                headers: {
                    'Authorization': "Bearer " + UserService.getAccessToken() + ""
                }})
                    .success(function(data) {
                $scope.calendarName = $scope.group.label;
                angular.forEach(data.reservations, function(value, key) {
                    var min = value.time_slot.start.split(':');
                    min = min[1];
                    var start = new Date(value.date);
                    start.setHours(parseInt(value.time_slot.start));
                    start.setMinutes(parseInt(min));
                    var end = new Date(value.date);
                    min = value.time_slot.end.split(':');
                    min = min [1];
                    end.setHours(parseInt(value.time_slot.end));
                    end.setMinutes(parseInt(min));

                    $scope.events.push({
                        title: value.teaching.lesson.subject.label + '\n' + value.teaching.group.label + ' ' + value.room.label, start: start, end: end, allDay: false
                    });
                });
            })
                    .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:trtaiter l'erreur
                console.log(status);
                console.log(data);
            });
        };

        $scope.getTeacherCalendar = function(teacher) {
            $http({
                method: 'Get',
                url: apiUrl + '/teachers/' + teacher.id + '/reservations',
                headers: {
                    'Authorization': "Bearer " + UserService.getAccessToken() + ""
                }})
                    .success(function(data) {
                $scope.calendarName = $scope.teacher.first_name + $scope.teacher.last_name;
                angular.forEach(data.reservations, function(value, key) {
                    var min = value.time_slot.start.split(':');
                    min = min[1];
                    var start = new Date(value.date);
                    start.setHours(parseInt(value.time_slot.start));
                    start.setMinutes(parseInt(min));
                    var end = new Date(value.date);
                    min = value.time_slot.end.split(':');
                    min = min [1];
                    end.setHours(parseInt(value.time_slot.end));
                    end.setMinutes(parseInt(min));

                    $scope.events.push({
                        title: value.teaching.lesson.subject.label + '\n' + value.teaching.group.label + ' ' + value.room.label, start: start, end: end, allDay: false
                    });
                });
            })
                    .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:trtaiter l'erreur
                console.log(status);
                console.log(data);
            });
        };
    });
});
