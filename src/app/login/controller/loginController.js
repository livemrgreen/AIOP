/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['app', 'jQuery'], function (app) {
    return app.controller('LoginController', ['$scope',
        function LoginController($scope) {

            console.log ("coucou");
        }
    ]);
});
