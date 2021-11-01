const Pago = require('../models/Pago');
const Cliente = require('../models/Cliente');
const {validationResult} = require('express-validator');

//Crear un nuevo pago
exports.crearPago = async (req, res) =>{
   
    //Revisar si hay errores con express validator
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        res.status(400).json({errores: errores.array()});
    }

    try {
        //Extraer el cliente y comprobar si existe
        const {cliente} = req.body;

        const existeCliente = await Cliente.findById(cliente);
        if(!existeCliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' })
        }

        //Revisar si el cliente pertenece al usuario autenticado
        if(existeCliente.creador.toString() !== req.user.id) {
            return res.status(401).send({msg: 'No autorizado'})
        }

        //Crear el pago
        const pago = new Pago(req.body);
        await pago.save();
        res.json(pago); 

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}


//Obtener los pagos
exports.obtenerPagos = async (req, res) => {
     
    try {
        //Extraer el cliente y comprobar si existe
        const {cliente} = req.body;

        const existeCliente = await Cliente.findById(cliente);
        if(!existeCliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' })
        }

        //Revisar si el cliente pertenece al usuario autenticado
        if(existeCliente.creador.toString() !== req.user.id) {
            return res.status(401).send({msg: 'No autorizado'})
        }

        //Obtener los pagos
        pagos = await Pago.find({ cliente })
        res.json({ pagos })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}