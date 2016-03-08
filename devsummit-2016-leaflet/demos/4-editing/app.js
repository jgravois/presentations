/**
 * General map and layer setup
 */
var map = L.map('map').setView([38.9023, -77.0468], 12);

L.esri.basemapLayer("DarkGray", {
  editable: true
}).addTo(map);

var fuelStations = L.esri.featureLayer({
  url: "http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Alternative_Fueling_Stations_Editable/FeatureServer/0",
}).addTo(map);

var popupTemplate = $('#popup-template').html();

fuelStations.bindPopup(function(e){
  return L.Util.template(popupTemplate, e.feature.properties)
});

/**
 * Search Setup
 */

var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

var addressSearch = L.esri.Geocoding.geosearch({
  providers: [arcgisOnline]
}).addTo(map);

/**
 * Editing setup
 */

var editTemplate = $('#editing-template').html();
var geocodeService = L.esri.Geocoding.geocodeService();

/**
 * Creates accepts an object of properties and a latlng
 * and returns the formatted HTML content to use in the
 * popup.
 */
function createEditingPopup (properties, latlng) {
  var content = document.querySelector('#editing-template').content;
  var t = document.importNode(content, true);

  if (properties) {
    for (var key in properties) {
      var value = properties[key];
      $(t).find('[name="'+key+'"]').val(value);
    }
  } else {
    $(content).find('[name="FID"]').remove();
  }

  if (latlng) {
    $(t).find('[name="X"]').val(latlng.lng);
    $(t).find('[name="Y"]').val(latlng.lat);
  }

  if (!properties) {
  }

  return t;
}

/**
 * Takes a feature id and latlng and updates the
 * features geometry
 */
function updateLocation (id, latlng) {
  var feature = fuelStations.getFeature(id).feature;
  feature.geometry.coordinates = [latlng.lng, latlng.lat];
  fuelStations.updateFeature(feature, function (error, response) {
    console.log('updated location', error, response);
  });
}

/**
 * Start editng a feature location by listening for
 * mousedown on the feature layer, disabling map dragging
 * and listening for move events to update the feature.
 * when dragging finishes the features location will be
 * updated in the API.
 */
function startEditingLocation (id) {
  map.closePopup();

  var layer = fuelStations.getFeature(id);

  function dragHandler (e) {
    layer.setLatLng(e.latlng);
  }

  function createDraggingHandler(e) {
    if (e.layer === layer) {
      map.on('mousemove', dragHandler);
      map.dragging.disable();
    }

    map.on('mouseup',function(e){
      map.dragging.enable();
      map.off('mousemove', dragHandler);
      fuelStations.off('mousedown', createDraggingHandler);
      updateLocation(id, e.latlng);
    });
  }

  fuelStations.on('mousedown', createDraggingHandler);
}

/**
 * Accepts a features ID, create a form to edit that feature
 * and opens the editing popup.
 */
function startEditingAttributes (id) {
  var layer = fuelStations.getFeature(id);
  var latlng = layer.getLatLng();
  var popupContent = createEditingPopup(layer.feature.properties, latlng);
  var popup = L.popup()
    .setLatLng(latlng)
    .setContent(popupContent)
    .openOn(map);
}

/**
 * Accepts form data from a form submission event and
 * updates that feature in the API.
 */
function updateExistingFeature (data) {
  var layer = fuelStations.getFeature(data.FID);
  var feature = layer.feature;
  $.extend(feature.properties, data);
  feature.geometry.coordinates = [data.X, data.Y];
  fuelStations.updateFeature(feature, function (error, response) {
    map.closePopup();
    console.log('updated attributes', error, response);
  });
}

/**
 * Accepts form data from a form submission event and
 * creates the features in the API.
 */
function createNewFeature (data) {
  var feature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [data.X, data.Y]
    },
    properties: data
  };
  fuelStations.addFeature(feature, function (error, response) {
    map.closePopup();
    console.log('created feature', error, response);
  });
}

/**
 * start creating a new feature by disabling dragging and
 * listen for the next map click, reverse geocode that
 * location, and open the popup to start creating a new feature.
 */
function startCreatingFeature () {
  map.dragging.disable();
  map.once('click', function (e) {
    map.dragging.enable();
    geocodeService.reverse().latlng(e.latlng).run(function(error, result) {
      var popupContent = createEditingPopup({
        Street_Add: result.address.Address,
        City: result.address.City,
        State: result.address.Region,
        ZIP: result.address.Postal
      }, e.latlng);

      var popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(map);
    });
  });
}

/**
 *
 */
function deleteFeature (id) {
  fuelStations.deleteFeature(id, function (error, response) {
    map.closePopup();
    console.log('deleted', error, response);
  });
}

/**
 * Listen for clicks on <button class="add-feature"> and
 * start the creation processing.
 */
$(document).on('click', 'button.add-feature', function (e) {
  startCreatingFeature();
});

/**
 * Listen for clicks on <button class="edit-attributes"> and
 * call the start editng function
 */
$(document).on('click', 'button.edit-attributes', function (e) {
  var id = parseInt($(e.target).data('fid'), 10);
  startEditingAttributes(id);
});

/**
 * Listen for clicks on <button class="delete-feature"> and
 * call the delete feature function.
 */
$(document).on('click', 'button.delete-feature', function (e) {
  var id = parseInt($(e.target).data('fid'), 10);
  deleteFeature(id);
});

/**
 * Listen for clicks on <button class="edit-location"> and
 * start the edit location process.
 */
$(document).on('click', 'button.edit-location', function (e) {
  var id = parseInt($(e.target).data('fid'), 10);
  startEditingLocation(id);
});

/**
 * Listen for a form submission, seralize the data to
 * an object, do a little processing call either create
 * or update the feature.
 */
$(document).on('submit', 'form.edit-form', function (e) {
  var data = $(e.target).serializeObject();
  data.ZIP = parseInt(data.ZIP, 10);
  data.X = parseFloat(data.X, 10);
  data.Y = parseFloat(data.Y, 10);

  if(data.FID) {
    data.FID = parseInt(data.FID, 10);
    updateExistingFeature(data);
  } else {
    createNewFeature(data);
  }

  e.stopPropagation();
  e.preventDefault();
});

/**
 * Small JQuery plugin that will convert a <form> object
 * to a JavaScript object.
 *
 * From: http://stackoverflow.com/a/1186309/449686.
 */
$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};