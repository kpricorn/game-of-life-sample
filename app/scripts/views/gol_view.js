define([
  'jquery',
  'underscore',
  'backbone',
  'paper',
  'models/gol_model'
], function($, _, Backbone, paper, GOLModel){
  var GOLView = Backbone.View.extend({

    el: $('#gol'),

    events: {
      'click .js-toggle': 'toggle',
      'click .js-reset': 'reset',
    },

    initialize: function() {
      this.size = 10;
      this._rects = [];
      this.canvas = this.$('canvas').get(0);
      this.tool = new paper.Tool();
      this.tool.onMouseDown = _.bind(this.mouseDown, this);
      this.tool.onMouseDrag = _.bind(this.mouseDrag, this);
      paper.setup(this.canvas);

      this.model.on('change:sequence', this.sequenceChanged, this);
      this.model.on('change:running', this.runningChanged, this);
    },

    mouseDown: function(event) {
      this.handleMouseEvent(event.point.x, event.point.y);
    },

    mouseDrag: function(event) {
      this.handleMouseEvent(event.point.x, event.point.y);
    },

    handleMouseEvent: function(x, y) {
      this.model.game.set(
        parseInt((x - (this.canvas.width / 2)) / this.size),
        parseInt((y - (this.canvas.height / 2)) / this.size)
      );
      this.renderCells();
    },

    runningChanged: function(model, value) {
      this.$('.js-toggle').val(value ? 'Stop' : 'Start');
    },

    sequenceChanged: function(model, value) {
      this.updateSequenceCounter(value);
      this.renderCells();
    },

    updateSequenceCounter: function(sequence) {
      this.$('.js-sequence').html(sequence);
    },

    renderCells: function() {
      xOffset = this.canvas.width / 2;
      yOffset = this.canvas.height / 2;
      var topLeft;
      var rect;
      var x;
      var y;
      var rect;
      _.invoke(this._rects, 'remove');
      this._rects = _.map(this.model.game.cells(), function(c) {
        x = c[0] * this.size + xOffset;
        y = c[1] * this.size + yOffset;
        topLeft = new paper.Point(x, y);
        rect = new paper.Path.Rectangle(topLeft, [this.size, this.size]);
        rect.fillColor = 'black';
        return rect;
      }, this);
      paper.view.draw();
    },

    toggle: function(e) {
      this.model.toggle();
    },

    reset: function(e) {
      this.model.reset();
    },

    renderGrid: function(size) {
      var xOffset = (this.canvas.width / 2) % this.size;
      var yOffset = (this.canvas.height / 2) % this.size;
      for (var xCounter = xOffset; xCounter < this.canvas.width; xCounter += this.size) {
        var l = new paper.Path.Line([xCounter, 0], [xCounter, this.canvas.height]);
        l.opacity = 0.2;
        l.strokeColor = '#555';
      }
      for (var yCounter = yOffset; yCounter < this.canvas.width; yCounter += this.size) {
        var l = new paper.Path.Line([0, yCounter], [this.canvas.width, yCounter]);
        l.opacity = 0.2;
        l.strokeColor = '#555';
      }
    },

    render: function() {
      this.renderGrid(this.size);
      this.renderCells();
      paper.view.draw();
      return this;
    }
  });
  return GOLView;
});
