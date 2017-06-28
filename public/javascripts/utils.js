// var v = [{'@context': ['http://www.w3.org/ns/anno.jsonld'], 'type': null, 'metadata': [], 'format': null, 'language': null, 'processingLanguage': null, 'creator': {'name': null, 'motivation': 'identifying'}, 'notFeature': {'notType': 'Feature', 'notGeometry': {'notType': 'Polygon'}, 'notCrs': {'notType': 'name', 'notProperties': 'L.CRS.Simple'}}, 'coordinates': [[194, -238], [194, -207], [353, -207], [353, -238], [194, -238]], 'OCD': null, 'parent': null, 'transcription_fragment': null, 'translation_fragment': null, '_id': '27027072636966754', 'id': 'http://localhost:7777/api/vectors/27027072636966754'}]
// debugger

// var v =

const load = function load (vectors) {
  vectors.forEach(data => {
    var {coordinates, notFeature: { notGeometry: {notType} }, _id, transcription_fragment, translation_fragment, parent, children, OCD} = data

    var tempGeoJSON = { 'type': 'Feature', 'properties': {}, 'geometry': {} }
    var oldData = tempGeoJSON
    oldData.geometry.type = notType
    oldData.geometry.coordinates = [coordinates]
    oldData.properties.transcription_fragment = transcription_fragment
    oldData.properties.translation_fragment = translation_fragment
    oldData.properties.parent = parent
    oldData.properties.children = children
    oldData.properties.OCD = OCD

  // console.log(oldData)

    L.geoJson(oldData,
      { style: {
        color: Polyanno.colours.default.vector
      },
        onEachFeature: function (feature, layer) {
          layer._leaflet_id = _id,
            allDrawnItems.addLayer(layer),
            layer.bindPopup(popupVectorMenu)
        }
      }).addTo(polyanno_map)
  })
}

export { load }
