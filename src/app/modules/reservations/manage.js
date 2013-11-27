/**
 * Home controller definition
 * @scope Controllers
 */
define([
    'app'
], function(app) {
    'use strict';

    app.register.controller('ManageReservationsController', function($scope, $http, $filter, $location, UrlService, LocalStorageService, UserService) {

        var apiUrl = UrlService.selectedAPI;
        
        /*****************************************************************************
         *      Functions used by Metis to change view and logout
         *****************************************************************************/
        $scope.classReservations = ''; //open by default
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
         *          Function for displayed reservations
         *
         ***********************************************************************************/

        $scope.pendingRequests = [];

        $http({
            method: 'Get',
            url: apiUrl + '/teachers/' + UserService.getUser().teacher.id + '/available_reservation_requests',
            headers: {
                'Authorization': "Bearer " + UserService.getAccessToken() + ""
            }})
                .success(function(data) {
            angular.forEach(data.reservation_requests, function(value) {
                value.date = value.date.split('T')[0];
                value.time_slot.start = value.time_slot.start.split(':');
                value.time_slot.start = value.time_slot.start[0] + 'h' + value.time_slot.start[1];

                value.time_slot.end = value.time_slot.end.split(':');
                value.time_slot.end = value.time_slot.end[0] + 'h' + value.time_slot.end[1];
                $scope.pendingRequests.push(value);
            });
        })
                .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            //todo:trtaiter l'erreur
            console.log(status);
            console.log(data);
        });

        $scope.algoOK = false;
        $scope.isManaging = false;

        $scope.checkRoomAvailability = function(request, index) {
            $scope.selectedIndex = index;
            $scope.isManaging = true;

            $http({
                method: 'Get',
                url: apiUrl + '/reservation_requests/' + request.id + '/available_rooms',
                headers: {
                    'Authorization': "Bearer " + UserService.getAccessToken() + ""
                }})
                    .success(function(data) {
                if (data.rooms.length !== 0) {
                    $scope.algoOK = true;
                    $scope.roomId = data.rooms[0].id;
                }
                else {
                    $scope.algoOK = false;
                    $scope.roomId = null;
                }
            })
                    .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:traiter l'erreur
                console.log(status);
                console.log(data);
            });
        };

        $scope.validateRequest = function(req, index) {

            var reservation = {
                reservation: {
                    date: req.date,
                    room_id: $scope.roomId,
                    time_slot_id: req.time_slot.id,
                    teaching_id: req.teaching.id,
                    reservation_request_id: req.id
                }
            };

            $http({
                method: 'Post',
                url: apiUrl + '/reservations',
                data: reservation,
                headers: {
                    'Authorization': "Bearer " + UserService.getAccessToken() + ""
                }})
                    .success(function() {
                $scope.pendingRequests.splice(index, 1);
                $scope.isManaging = false;
                $scope.selectedIndex = null;
            })
                    .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:traiter l'erreur
                console.log(status);
                console.log(data);
                $scope.isManaging = false;
                $scope.selectedIndex = null;
            });
        };

        $scope.refuseRequestMM = function(req, index) {
            var request = {
                reservation_request: {
                    date: req.date,
                    capacity: req.capacity,
                    time_slot_id: req.time_slot.id,
                    teaching_id: req.teaching.id,
                    status: '-2'
                }
            };
            $http({
                method: 'Put',
                url: apiUrl + '/reservation_requests/' + req.id,
                data: request,
                headers: {
                    'Authorization': "Bearer " + UserService.getAccessToken() + ""
                }})
                    .success(function() {
                $scope.pendingRequests.splice(index, 1);
                $scope.isManaging = false;
                $scope.selectedIndex = null;
            })
                    .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:traiter l'erreur
                console.log(status);
                console.log(data);
                $scope.isManaging = false;
                $scope.selectedIndex = null;
            });
        };

        $scope.refuseRequestAlgo = function(req, index) {
            var request = {
                reservation_request: {
                    date: req.date,
                    capacity: req.capacity,
                    time_slot_id: req.time_slot.id,
                    teaching_id: req.teaching.id,
                    status: '-1'
                }
            };
            $http({
                method: 'Put',
                url: apiUrl + '/reservation_requests/' + req.id,
                data: request,
                headers: {
                    'Authorization': "Bearer " + UserService.getAccessToken() + ""
                }})
                    .success(function() {
                $scope.pendingRequests.splice(index, 1);
                $scope.isManaging = false;
                $scope.selectedIndex = null;
            })
                    .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //todo:traiter l'erreur
                console.log(status);
                console.log(data);
                $scope.isManaging = false;
                $scope.selectedIndex = null;
            });
        };
    });
});
