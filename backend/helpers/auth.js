const { response } = require('express');
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '070320';
var user1 = require('../models/usuarios');
var user2 = '';

function generarToken(usuario){
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(1, 'minuto').unix()
    }
    user2 = usuario.rol;
    return jwt.encode(payload, secret);
}

function validarToken(req, resp, nextStep){
    try{
        if(user2 == 'coach'){
            var tokenEnviadoPorUsuario = req.headers.authorization;
            var tokenLimpio = tokenEnviadoPorUsuario.replace('Token ', '');
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