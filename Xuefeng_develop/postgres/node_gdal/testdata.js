var gdal = require("gdal");
var dataset = gdal.open("Canal_Routes_ENG.shp");
var layer = dataset.layers.get(0);
const _ = require("lodash");



var info = "number of features: " + layer.features.count() + "\r\n"+ "fields: "
            + layer.fields.getNames()+ "\r\n" +"extent: " + JSON.stringify(layer.extent) +"\r\n"
            + "srs: " + (layer.srs ? layer.srs.toWKT() : 'null');


module.exports = { info }
