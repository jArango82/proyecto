'use strict'

var app = require('./application');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Proyecto").then(
    ()=>{
        console.log("Conexion exitosa");
        app.listen(9898, function(){
            console.log("Aplicacion corriendo en el puerto 9898");
        })
    },
    err => {
        console.log("Error al conectar a la base de datos");
    }
)