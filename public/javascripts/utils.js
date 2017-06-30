// var v = [{'@context': ['http://www.w3.org/ns/anno.jsonld'], 'type': null, 'metadata': [], 'format': null, 'language': null, 'processingLanguage': null, 'creator': {'name': null, 'motivation': 'identifying'}, 'notFeature': {'notType': 'Feature', 'notGeometry': {'notType': 'Polygon'}, 'notCrs': {'notType': 'name', 'notProperties': 'L.CRS.Simple'}}, 'coordinates': [[194, -238], [194, -207], [353, -207], [353, -238], [194, -238]], 'OCD': null, 'parent': null, 'transcription_fragment': null, 'translation_fragment': null, '_id': '27027072636966754', 'id': 'http://localhost:7777/api/vectors/27027072636966754'}]
// debugger

// var v =

// const load = function load (vectors) {
//   vectors.forEach(data => {
//     var {coordinates, notFeature: { notGeometry: {notType} }, _id, transcription_fragment, translation_fragment, parent, children, OCD} = data

//     var tempGeoJSON = { 'type': 'Feature', 'properties': {}, 'geometry': {} }
//     var oldData = tempGeoJSON
//     oldData.geometry.type = notType
//     oldData.geometry.coordinates = [coordinates]
//     oldData.properties.transcription_fragment = transcription_fragment
//     oldData.properties.translation_fragment = translation_fragment
//     oldData.properties.parent = parent
//     oldData.properties.children = children
//     oldData.properties.OCD = OCD

//   // console.log(oldData)

//     L.geoJson(oldData,
//       { style: {
//         color: Polyanno.colours.default.vector
//       },
//         onEachFeature: function (feature, layer) {
//           layer._leaflet_id = _id,
//             allDrawnItems.addLayer(layer),
//             layer.bindPopup(popupVectorMenu)
//         }
//       }).addTo(polyanno_map)
//   })
// }

// - const editors = []

function loadToMap (vectors) {
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

function loadToPolyanno (vectors, annotations, transcriptions, translations, editors) {
  // - console.log(vectors, annotations, transcriptions, translations, editors)

  vectors.forEach(vector => {
    Object.setPrototypeOf(vector, Polyanno.vector.prototype)
    // - console.log(vector)
    Polyanno.vectors.add(vector)
  })

  annotations.forEach(annotation => {
    Object.setPrototypeOf(annotation, Polyanno.annotation.prototype)
    // - console.log(annotation)
    Polyanno.annotations.add(annotation)
  })

  transcriptions.forEach(transcription => {
    Object.setPrototypeOf(transcription, Polyanno.transcription.prototype)
    // - console.log(transcription)
    Polyanno.transcriptions.add(transcription)
  })

  translations.forEach(translation => {
    Object.setPrototypeOf(translation, Polyanno.translation.prototype)
    // - console.log(translation)
    Polyanno.transcriptions.add(translation)
  })

  editors.forEach(editor => {
    Object.setPrototypeOf(editor, Polyanno.editor.prototype)
    // - console.log(editor)
    Polyanno.transcriptions.add(editor)
  })
}

const load = function () {
  const imageId = idExtractor(imageSelected)
  $.get(`/document/${imageId}`, function (data) {
    console.log(data)
    if ((typeof data) !== 'string') {
    // const data = JSON.stringify(object)
      const vectors = JSON.parse(data.vectors)
      const annotations = JSON.parse(data.annotations)
      const transcriptions = JSON.parse(data.transcriptions)
      const translations = JSON.parse(data.translations)
      const editors = JSON.parse(data.editors)

      loadToMap(vectors)
      loadToPolyanno(vectors, annotations, transcriptions, translations, editors)
      console.log(vectors, annotations, transcriptions, translations, editors)
    } else {
      console.log(data)
    }
  })
}

$(document).bind('seadragonExtension.onCurrentViewUri', function (event, obj) {
  let uri = obj.fullUri
  uri = uri.split('/').slice(0, -4)
  uri.push('info.json')
  uri = uri.join('/')

  imageSelected = uri

  console.log(imageSelected)

  const html =
  `<div class="row" id="polyanno-top-bar"><\/div>
  <div class="row" id="polyanno-page-body"><\/div>
  <script src="/javascripts/modules/dragondrop.js"><\/script>
  <script src="/javascripts/modules/alltheunicode.js"><\/script>
  <script src="/javascripts/modules/polyanno.js"><\/script>
  <script src="/javascripts/modules/PolyannoSetup.js"><\/script>
  <script src="/dist/PolyannoEd.bundle.js"><\/script>`

  //  console.log(html)
  $('#polyannoDiv').html(html)
  load()
})

const idExtractor = function (uri) {
  return uri.split('/').find(data => data.includes('UoE'))
}

$('#savePolyanno').on('click', function () {
  const recordUndefined = function (k, v) { if (v === undefined) { return null } return v }

  const imageId = idExtractor(imageSelected)

  const annotations = JSON.stringify(Polyanno.annotations.getAll(), recordUndefined)
  const vectors = JSON.stringify(Polyanno.vectors.getAll(), recordUndefined)
  const translations = JSON.stringify(Polyanno.translations.getAll(), recordUndefined)
  const transcriptions = JSON.stringify(Polyanno.transcriptions.getAll(), recordUndefined)
  const editors = JSON.stringify(JSON.decycle(Polyanno.editors.getAll(), true))

  $.post('/save',
         {imageId: imageId, vectors: vectors, annotations: annotations, translations: translations, transcriptions: transcriptions, editors: editors},
          function (data) {
            // location.reload()
            console.log(data)
          }
    )
})

$('document').ready(load())
