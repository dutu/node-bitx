'use strict'

var EventEmitter = require('events').EventEmitter
var util = require('util')
var PassThrough = require('stream').PassThrough

function Request (data, options) {
  options = options || {}
  this.fail = options.fail || false
  this.stringify = options.stringify !== false

  this.response = new PassThrough()
  this.response.statusCode = options.statusCode || 200
  this.response.write(this.stringify ? JSON.stringify(data) : data)
  this.response.end()

  EventEmitter.call(this)
}

util.inherits(Request, EventEmitter)

Request.prototype.end = function () {
  if (this.fail) {
    this.emit('error', new Error())
  } else {
    this.emit('response', this.response)
  }
}

module.exports = Request
