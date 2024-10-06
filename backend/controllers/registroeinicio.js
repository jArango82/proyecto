'use strict'

var usuario = require('../models/usuarios');
var token = require('../helpers/auth');
var bcrypt = require('bcryptjs');
const Usuarios = require('../models/usuarios');

function registrar(req, resp){
    var parametros = req.body;

    if(!parametros.password || !parametros.nombre || !parametros.email || !parametros.rol || !parametros.apellido){
        return resp.status(500).send({message: 'Faltan campos por llenar'});
    }

    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(parametros.password, salt);
    var nuevoUsuario = new usuario()
    nuevoUsuario.nombre = parametros.nombre,
    nuevoUsuario.apellido = parametros.apellido,
    nuevoUsuario.email = parametros.email,
    nuevoUsuario.password = password,
    nuevoUsuario.rol = parametros.rol

    nuevoUsuario.save().then(
        (usuarioGuardado) => {
            resp.status(200).send({message: usuarioGuardado})
        },
        (err) => {
            resp.status(500).send({message: 'Error al guardar el usuario'})
        }
        );
}

function IniciarSesion (req, resp){
    var parametros = req.body;
    var emailIngresado = parametros.email;
    var passwordIngresado = parametros.password;

    Usuarios.findOne({email: emailIngresado}).then(
        (usuarioEncontrado)=>{
            if(usuarioEncontrado == null){
                resp.status(403).send({message: 'Usuario no encontrado'});
            }
            else{
                console.log(usuarioEncontrado);
                if(bcrypt.compareSync(
                    passwordIngresado, usuarioEncontrado.password)){
                        resp.status(200).send({
                            message: 'Login exitoso',
                            usuarioN: usuarioEncontrado.nombre,
                            usuarioA: usuarioEncontrado.apellidos,
                            usuarioE: usuarioEncontrado.email,
                            token: token.generarToken(usuarioEncontrado)
                        })
                    }
                    else{
                        resp.status(403).send({message: 'credenciales incorrecta'});
                    }
            }
        },
        (err)=>{
            resp.status(500).send({message: 'Error en el servidor'});
        }
    )

}



module.exports = {
    IniciarSesion, registrar
}
