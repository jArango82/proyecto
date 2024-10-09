'use strict'

const { response } = require('express');
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "070320";
var useer = require('../models/usuarios');
var user = false;

function generarToken(usuario){
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(1, 'minutos').unix
    }
    user = usuario.rol;
    return jwt.encode(payload, secret);
}

function validarToken(req, resp, nextStep){
    try{
        if(user == true){
            var tokenEnviadoPorUsuario = req.headers.authorization;
            var tokenLimpio = tokenEnviadoPorUsuario.replace('Bearer ', '');
            var payload = jwt.decode(tokenLimpio, secret);
            req.headers.userId = payload.sub;
            nextStep();
        }
        else{
            resp.status(403).send({message: 'No tienes permisos para acceder a este recurso'});
        }
    }
    catch(ex){
        resp.status(403).send({message: 'Token inválido'});
    }
}

module.exports = {
    generarToken, validarToken
}