'use strict'

var express = require('express');
var authcontroller = require('../controllers/registroeinicio');
var validarToken = require('../helpers/auth');
var router = express.Router();

router.post('/api/registrar', authcontroller.registrar);
router.post('/api/iniciar', authcontroller.IniciarSesion);

module.exports = router;