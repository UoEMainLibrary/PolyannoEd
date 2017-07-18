// import library for web healthcheck
const healthcheck = require('healthcheck-middleware')
const mongoose = require('mongoose')
mongoose.promise = global.Promise

exports.contact = (req, res) => {
  res.render('contact')
}

exports.about = (req, res) => {
  res.render('about')
}

exports.toc = (req, res) => {
  res.render('toc')
}

exports.healthcheck = healthcheck({
  addChecks: async(fail, pass) => {
    await pass({
      'status': 'Everything is OK',
      'database': (mongoose.connection.readyState === 1) ? 'Database is connected' : 'Database is not connected'
    })
  },

  healthInfo: (passInfo) => {
    console.log(passInfo)
    return {
      status: passInfo.status,
      database: passInfo.database
    }
  }
})

exports.health = healthcheck()
