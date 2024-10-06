'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes/routes')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(routes)

module.exports = app