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

  $.post('/save',
         {vectors: vectors, annotations: annotations},
          function (data) {
            // location.reload()
            console.log(data)
          }
    )
})

module.exports = load
