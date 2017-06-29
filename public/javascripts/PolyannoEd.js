import '../style/dragondrop.css'
import '../style/alltheunicode.css'
import '../style/polyanno.css'
import '../style/PolyannoEd.css'

import './dragondrop.js'
import './alltheunicode.js'
import './polyanno.js'
import './PolyannoSetup.js'
import { load } from './utils.js'

$('#savePolyanno').on('click', function () {
  const recordUndefined = function (k, v) { if (v === undefined) { return null } return v }

  const annotations = JSON.stringify(Polyanno.annotations.getAll(), recordUndefined)
  const vectors = JSON.stringify(Polyanno.vectors.getAll(), recordUndefined)
  const translations = JSON.stringify(Polyanno.translations.getAll(), recordUndefined)
  const transcriptions = JSON.stringify(Polyanno.transcriptions.getAll(), recordUndefined)
  const editors = JSON.stringify(JSON.decycle(Polyanno.editors.getAll(), true))

  $.post('/save',
         {vectors: vectors, annotations: annotations, translations: translations, transcriptions: transcriptions, editors: editors},
          function (data) {
            location.reload()
            console.log(data)
          }
    )
})
