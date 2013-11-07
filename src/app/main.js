/*global require*/
'use strict';

require.config({
    paths: {
        'domReady': 'assets/lib/requirejs-domready/domReady',
        'angular': 'bower_components/angular/angular',
        'moment': 'bower_components/moment/moment-with-langs.min',
        'main' : 'assets/js/main.js',
        'underscore' : 'bower_components/underscore/underscore-min',
        'jQuery' : 'assets/lib/jquery.min'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'underscore' : {
            exports: '_'
        },
        'angular': {
            exports: 'angular'
        }
    },

    deps: ['./bootstrap']

}, ['angular', 'underscore', ], function(app){



});


