import '../style/dragondrop.css'
import '../style/alltheunicode.css'
import '../style/polyanno.css'
import '../style/PolyannoEd.css'

import './dragondrop.js'
import './alltheunicode.js'
import './polyanno.js'

imageSelected = 'http://images.is.ed.ac.uk/luna/servlet/iiif/UoEwmm~2~2~77099~164515/info.json'

var polyanno_setup_options = {
  'highlighting': true,
  'minimising': true,
  'voting': true
}

// this is assuming the defaults of storage URLs using the web page url and polyanno_storage for storage and no users
polyanno_setup(polyanno_setup_options)
