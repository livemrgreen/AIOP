'use strict';

require.config({
    paths: {
        'jquery' : 'bower_components/jquery/jquery.min',
        'jquery-ui' : 'bower_components/jquery-ui/ui/minified/jquery-ui.min',
        'angular': 'bower_components/angular/angular.min',
        'angularAMD': 'bower_components/angularAMD/angularAMD.min',
        'angular-route': 'bower_components/angular-route/angular-route.min',
        'angular-calendar': 'bower_components/angular-ui-calendar/src/calendar',
        'metis' : 'assets/js/main',
        'fullcalendar': 'bower_components/fullcalendar/fullcalendar',
        'bootstrap' : 'bower_components/angular-bootstrap/ui-bootstrap.min'
    },
    shim: {
        'bootstrap' : ['jquery'],
        'angularAMD': ['jquery', 'metis', 'angular'],
        'angular-route': ['angular'],
        'angular-calendar' : ['jquery', 'jquery-ui', 'angular' ,'fullcalendar'],
        'metis': ['jquery', 'jquery-ui']
    },
    deps: ['app']
});