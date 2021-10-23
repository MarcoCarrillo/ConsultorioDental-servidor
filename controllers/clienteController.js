const Cliente = require('../models/Cliente');
const { validationResult } = require('express-validator')

exports.crearCliente = async (req, res) => {

    //Revisar si hay errores con express validator
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        res.status(400).json({errores: errores.array()});
    }

    try {
        //Crear un nuevo paciente
        const cliente = new Cliente(req.body);

        //Guardar el creador via jsonwebtoken
        cliente.creador = req.user.id;
        console.log(req.user);

        cliente.save();
        res.json(cliente);
        // console.log(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


//Obtiene todos los pacientes del usuario actual
exports.obtenerClientes = async (req, res) => {
    try {
        // console.log(req.user);
        const clientes = await Cliente.find({ creador: req.user.id }).sort({creado: -1});
        res.json({clientes})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


//Eliminar un cliente por id
exports.eliminarCliente = async (req, res) => {
    
    try {
        //Revisar el id
        let cliente = await Cliente.findById(req.params.id);
        // console.log(req);

        //Si el paciente no existe
        if(!cliente) {
            return res.status(404).send({msg: 'Paciente no encontrado'})
        }

        //Verificar el creador del paciente
        if(cliente.creador.toString() !== req.user.id) {
            return res.status(401).send({msg: 'No autorizado'})
        }

        //Eliminar el paciente
        await Cliente.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'El paciente se eliminó correctamente'});

    } catch (error) {
        console.log(error);
        res.status(500).send({msg: 'Error en el servidor'})
    }
}
