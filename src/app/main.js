/*global require*/
'use strict';

require.config({
    paths: {
        'moment': 'bower_components/moment/moment-with-langs.min',
        'main' : 'assets/js/main.js',
        'jQuery' : 'assets/lib/jquery.min',
        'domReady': 'assets/lib/requirejs-domready/domReady',
        'angular': 'bower_components/angular/angular'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        angular: {
            exports: 'angular'
        }
    },

    deps: ['./bootstrap']

});


