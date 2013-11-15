/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
  'require',
  'angular',
  'routes'
], function (require, ng) {
  'use strict';

  /*place operations that need to initialize prior to app start here
   * using the `run` function on the top-level module
   */

    require(['domReady'], function (domReady) {
        domReady(function() {
            console.log("1");
            ng.bootstrap(document, ['app']);
            console.log("2");
        })
    });

});
