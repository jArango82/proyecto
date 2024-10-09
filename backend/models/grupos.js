'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Usuario = require('./usuarios');

var crearGrupoSchema = Schema({
    nombre: String,
    descripcion: String,
    usuarios: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
})

module.exports = mongoose.model('Grupo', crearGrupoSchema);