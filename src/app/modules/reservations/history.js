/**
 * Home controller definition
 * @scope Controllers
 */
define([
    'app'
], function (app) {
    'use strict';

    app.register.controller('HistoryReservationsController', function ($rootScope, $scope, $http, $modal, $filter, $location, LocalStorageService, UrlService, UserService) {

        /*****************************************************************************
         *      Functions used by Metis to change view and logout
         *****************************************************************************/
        $scope.moduleManager = UserService.isModuleManager();

        $scope.open = function () {

            var $icon = $('.accordion-toggle').children('span').children('i');
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

        if (UserService.getUser().administrator)
            $scope.administrator = 'Administrator';
        else
            $scope.administrator = '';
        if (UserService.getUser().teacher.module_manager)
            $scope.moduleManager = 'Module Manager';
        else
            $scope.moduleManager = '';

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


        /***********************************************************************************
         *
         *          Function for displayed reservations
         *
         ***********************************************************************************/
        $scope.modifyArticleBaseModal = false;
        $scope.isLoading = false;

        var apiUrl = UrlService.urlNode;

        $scope.pendingRequests = [];

        /**
         * Get all request
         */
        $http({
            method: 'Get',
            url: apiUrl + '/teachers/'+UserService.getUser().teacher.id+'/reservation_requests',
            headers: {
                'Authorization': "Bearer " + UserService.getAccessToken() + ""
            }})
            .success(function(data) {
                angular.forEach(data.reservation_requests, function(value){

                    console.log(value.id)
                    console.log(value.status);
                    if (value.status){
                        if(value.status == '-1'){
                            console.log("-1 OK");
                            value.status = 'No rooms available';
                            value.style = 'danger';
                        }
                        else {
                            console.log("-2 OK");
                            value.status = 'Refused';
                            value.style = 'danger';
                        }
                    }
                    else{
                        console.log(value.reservation);
                        if (value.reservation){
                            console.log("Res OK");
                            value.style = 'success';
                            value.status = 'Accepted';
                        }
                        else{
                            console.log("ResN Ok");
                            value.style = 'info';
                            value.status = 'Pending';
                        }
                    }

                    value.date = value.date.split('T')[0];
                    value.time_slot.start = value.time_slot.start.split(':');
                    value.time_slot.start = value.time_slot.start[0]+'h'+ value.time_slot.start[1];

                    value.time_slot.end = value.time_slot.end.split(':');
                    value.time_slot.end = value.time_slot.end[0]+'h'+ value.time_slot.end[1];
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
