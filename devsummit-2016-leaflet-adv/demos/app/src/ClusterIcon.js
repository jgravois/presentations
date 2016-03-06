/**
 * Class for generating the icon for a cluster.
 * Adapted from https://github.com/SINTEF-9012/PruneCluster/blob/master/examples/realworld.50000-categories.html#L47-L147
 */
export default L.Icon.extend({
  /**
   * Default options will be merged with options are passed to `new L.Icon.MarkerCluster(options)`.
   * This is part of the Leaflet http://leafletjs.com/reference.html#class
   */
  options: {
    iconSize: new L.Point(56, 56),
    fillColor: '#FFFFFF',
    textColor: '#000000',
    ringWidth: 8,
    font: 'bold 14px sans-serif'
  },

  /**
   * Create the DOM element for this icon, in this case a <canvas> element
   * Overrides https://github.com/Leaflet/Leaflet/blob/master/src/layer/marker/Icon.js#L25-L27
   */
  createIcon: function () {
    var canvas = document.createElement('canvas');

    // adds the default leaflet icon classes to this so transitions work
    this._setIconStyles(canvas, 'icon');

    var size = this.options.iconSize;

    if (L.Browser.retina) {
      canvas.width = size.x + size.x;
      canvas.height = size.y + size.y;
    } else {
      canvas.width = size.x;
      canvas.height = size.y;
    }

    this.draw(canvas.getContext('2d'), canvas.width, canvas.height);

    return canvas;
  },


  /**
   * Create the DOM element for this icons shadow, in this case nothing
   * Overrides https://github.com/Leaflet/Leaflet/blob/master/src/layer/marker/Icon.js#L29-L31
   */
  createShadow: function () {
    return null;
  },

  /**
   * Draw the arcs and text on the <canvas>
   */
  draw: function(canvas, width, height) {
    // center of the circle
    var center = width / ((L.Browser.retina) ? 4 : 2);

    // radius of the outer rings
    var radius = width / ((L.Browser.retina) ? 4 : 2);

    // radius of the inner circle
    var radiusCenter = center - this.options.ringWidth;

    // double the scale if we are on a Retina display
    if (L.Browser.retina) {
      canvas.scale(2, 2);
    }

    // start position of our arc
    var arcStart = 0;

    // draw an arc for each category
    for (var category in this.options.categoryColors) {
      var color = this.options.categoryColors[category];
      var size = this.stats[category] / this.population;

      if (size > 0) {
        canvas.beginPath();
        canvas.moveTo(center, center);
        canvas.fillStyle = color;
        var arcEnd = arcStart + size * Math.PI * 2;
        if (arcEnd < arcStart) {
          arcEnd = arcStart;
        }
        canvas.arc(center, center, radius, arcStart, arcEnd);
        arcStart = arcEnd;
        canvas.moveTo(center, center);
        canvas.fill();
        canvas.closePath();
      }
    }

    canvas.beginPath();
    canvas.fillStyle = this.options.fillColor;
    canvas.moveTo(center, center);
    canvas.arc(center, center, radiusCenter, 0, Math.PI * 2);
    canvas.fill();
    canvas.closePath();
    canvas.fillStyle = this.options.textColor;
    canvas.textAlign = 'center';
    canvas.textBaseline = 'middle';
    canvas.font = this.options.font;
    canvas.fillText(this.population, center, center, radiusCenter * 2);
  }
});