/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    modernizr: '../bower_components/modernizr/modernizr',
    'requirejs-text': '../bower_components/requirejs-text/text',
    requirejs: '../bower_components/requirejs/require',
    paper: '../bower_components/paper/dist/paper-core',
    'game-of-life': '../bower_components/game-of-life/dist/game-of-life',
    lodash: '../bower_components/lodash/dist/lodash'
  }
});

require([
        'jquery',
        'views/gol_view',
        'models/gol_model',
        'app'
], function($, GOLView, GOLModel){
  $(function() {
    var golView = new GOLView({
      model: new GOLModel()
    });
    golView.render();
  });
});
