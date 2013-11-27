/**
 * defines constants for application
 */
define(['angular'], function (ng) {
  'use strict';
      return ng.module('app.constants', []).constant('config', {
      'nodeAPI' : 'http://162.38.113.210:8080',
      'rubyAPI' :  ''
  });
});
