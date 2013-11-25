/**
 * Home controller definition
 * @scope Controllers
 */
define([
    'app'
], function (app) {
    'use strict';

    app.register.controller('ReservationController', function ($rootScope, $scope, $http, $modal, $filter, $location, LocalStorageService, UserService) {

        /*****************************************************************************
         *      Functions used by Metis to change view and logout
         *****************************************************************************/
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


        /***********************************************************************************
         *
         *          Function for displayed reservations
         *
         ***********************************************************************************/
        $scope.modifyArticleBaseModal = false;
        $scope.isLoading = false;
        $scope.pendingRequests = [
            {
                id : 1,
                date : new Date(),
                time_slot : {id: 1, start: "8:00:00", end: "9:30:00"},
                teaching : {
                    id : 3,
                    group : {

                    },
                    lesson : {

                    },

                },
                characteristics:[
                    {
                        id: 1,
                        label : 'retro'
                    },
                    {
                        id: 2,
                        label: 'tp'
                    }
                ]
            }
        ];

        /**
         * Get all pending requests that the use can see and save it in $scope.pendingRequests
         */


        console.log($scope.pendingRequests);
        console.log($modal);
        /**
         *
         * @param id
         */
        $scope.checkRoom=  function(id){
            $scope.isLoading = true;
            console.log(id);
        }

        /**
         * Remove the request
         * @param id request'id
         */
        $scope.removeRequest = function(id){
            //http
            //remove from $scope.pendingRequest
        }


    });
});
