'use strict'

var express = require('express');
var authcontroller = require('../controllers/registroeinicio');
var gruposController = require('../controllers/creargrupo');
var validarToken = require('../helpers/auth');
var validarToken2 = require('../helpers/auth2');
var router = express.Router();

router.post('/api/registrar', authcontroller.registrar);
router.post('/api/iniciar', authcontroller.IniciarSesion);
router.post('/api/creargrupo',validarToken.validarToken, gruposController.crearGrupo);
router.post('/api/grupo/:nombreGrupo/unirse/:nombreUsuario', validarToken2.validarToken2, gruposController.unirseGrupo);

module.exports = router;