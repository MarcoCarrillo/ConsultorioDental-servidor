const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

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

        //Confirmacion
        res.json({ msg: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error')
    }
}