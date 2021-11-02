const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisar si hay errores con express validator
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        res.status(400).json({errores: errores.array()});
    }

    //Extraer usuario y password
    const {usuario, password} = req.body;

    try {
        //Revisar que sea un usuario registrado
        let user = await Usuario.findOne({ usuario });
        if (!user){
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        //Revisar el password
        const passCorrecto = await bcryptjs.compare(password, user.password);
        if (!passCorrecto){
            return res.status(400).json({ msg: 'Password incorrecto'})
        }

        //Si todo es correcto crear y firmar el jwt
        const payload = {
            user: {
                id: user.id
            }
        };
        //Firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 7200 //2 horas
        }, (error, token) => {
            if(error) throw error;
            //Mensaje de confirmacion
            res.json( {token} )
        });

    } catch (error) {
        console.log(error);
    }

}


//Obtiene el usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.user.id);
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'})
    }
}