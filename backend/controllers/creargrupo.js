'use strict'

var gruposFit = require('../models/grupos');
const User = require('../models/usuarios');

function crearGrupo(req, res){
    var parametros = req.body;
    var nuevoGrupo = new gruposFit();
    nuevoGrupo.nombre = parametros.nombre;
    nuevoGrupo.descripcion = parametros.descripcion;
    nuevoGrupo.usuarios = parametros.usuarios;

    nuevoGrupo.save().then(
        (grupoGuardado) => {
            res.status(200).send({message: grupoGuardado})
        },
        (err) => {
            res.status(500).send({message: 'Error al guardar el grupo'})
        }
    );
}

async function unirseGrupo(req, res) {
    var nombreGrupo = req.params.nombreGrupo;
    var nombreUsuario = req.params.nombreUsuario;

    try {
        const grupo = await gruposFit.findOne({ nombre: nombreGrupo });
        if (!grupo) {
            return res.status(404).send({ message: 'El grupo no existe' });
        }

        const usuario = await User.findOne({ nombre: nombreUsuario });
        if (!usuario) {
            return res.status(404).send({ message: 'El usuario no existe' });
        }

        if (!grupo.usuarios.includes(usuario._id)) {
            grupo.usuarios.push(usuario._id);
            const grupoActualizado = await grupo.save();
            return res.status(200).send({ grupo: grupoActualizado });
        } else {
            return res.status(400).send({ message: 'El usuario ya pertenece al grupo' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Error en la petición' });
    }
}

module.exports = {
    crearGrupo, unirseGrupo
}