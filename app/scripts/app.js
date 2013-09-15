define([
  'jquery',
  'underscore',
  'backbone',
  'views/gol_view',
  'models/gol_model',
], function($, _, Backbone, GOLView, GOLModel) {
  var initialize = function(){
    var golView = new GOLView({
      model: new GOLModel()
    });
    golView.render();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
