const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //Revisar si hay errores con express validator
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        res.status(400).json({errores: errores.array()});
    }
    
    //Extraer usuario y password
    const {usuario, password} = req.body;


    try {
        //Revisar que el usuario sea unico
        let user = await Usuario.findOne({ usuario });
        if(user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // crea el nuevo usuario
        user = new Usuario(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //Guardar usuario
        await user.save();

        //Crear y firmar el jwt
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
        res.status(400).send('Hubo un error')
    }
}