// Filename: models/project
define([
       'underscore',
       'backbone',
       'game-of-life'
], function(_, Backbone, Game){
  var SEEDS = {
    oscilator: [
      [0, 0],
      [-1, 0],
      [1, 0],
    ],
    glider: [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, -1],
      [2, -1],
    ],
    foo: [
      [2, 5],
      [1, 6],
      [2, 6],
      [11, 5],
      [11, 6],
      [11, 7],
      [12, 4],
      [13, 3],
      [14, 3],
      [12, 8],
      [13, 9],
      [14, 9],
      [16, 7],
      [16, 4],
      [17, 5],
      [18, 6],
      [17, 7],
      [16, 8],
      [17, 6],
      [21, 5],
      [21, 4],
      [21, 3],
      [22, 5],
      [22, 4],
      [22, 3],
      [23, 2],
      [23, 6],
      [25, 2],
      [25, 1],
      [25, 6],
      [25, 7],
    ]
  };

  var GOLModel = Backbone.Model.extend({
    reset: function() {
      this.stop();
      this.initializeGame();
      this.set('sequence', 0);
      this.set('running', false);
    },

    toggle: function() {
      this.set('running', ! this.get('running'));
    },

    start: function() {
      this.set('running', true);
    },

    stop: function() {
      this.set('running', false);
    },

    tick: function() {
      if (this.get('running')) {
        this.game.turn();
        this.set('sequence', this.get('sequence') + 1);
      }
    },

    initializeGame: function(seed) {
      seed = seed || SEEDS['oscilator'];
      this.game = new Game.Game();
      _(seed).each(function(coords) {
        this.game.set(coords[0], coords[1]);
      }, this);
    },

    initialize: function() {
      this.reset();

      this.game.set(1, 5);
      (function(model) {
        window.setInterval(function() {
          model.tick();
        }, 300);
      })(this);
    },

    defaults: {
      running: false,
      sequence: 0,
    }
  });
  return GOLModel;
});
