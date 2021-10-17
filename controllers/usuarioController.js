const Usuario = require('../models/Usuario')

exports.crearUsuario = async (req, res) => {

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

        //Guardar usuario
        await user.save();

        //Confirmacion
        res.json({ msg: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error')
    }
}