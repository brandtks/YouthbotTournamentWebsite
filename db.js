var mysql = require('mysql')
var tunnel = require('tunnel-ssh')
var async = require('async')
var config = require('./config')

var state = {
  pool: null
}

exports.connect = function(useSsh, done) {
  if (useSsh) {
    tunnel(config.settings.ssh, function(err, server) {
      if (err)
        return done (err)
    })
    
    state.pool = mysql.createPool(config.settings.sqlTunnel)
  } else {
    state.pool = mysql.createPool(config.settings.sqlDirect)
  }

  done(false)
}

exports.get = function(done) {
  var pool = state.pool
  if (!pool)
    return done(new Error('Missing database connection'))
  return pool
}
