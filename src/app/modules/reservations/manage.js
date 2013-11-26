/**
 * Home controller definition
 * @scope Controllers
 */
define([
    'app'
], function(app) {
    'use strict';

    app.register.controller('ManageReservationsController', function($scope, $http, $filter, $location, UrlService, LocalStorageService, UserService) {

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

        /**
         * Get all request
         */

        var apiUrl = UrlService.urlNode;

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
    });
});
