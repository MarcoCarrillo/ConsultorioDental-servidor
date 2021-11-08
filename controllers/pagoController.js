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
        const {cliente} = req.query;

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


//Actualizar un pago
exports.actualizarPago = async (req, res) => {
    try {
         //Extraer el concepto y cantidad para poder editarlos
         const {concepto, cantidad, fecha} = req.body;

         //Revisar si el pago existe
         let pago = await Pago.findById(req.params.id);
         if(!pago) {
            return res.status(404).send({msg: 'Pago no encontrado'})
         }
 
         //Nuevo objeto con la nueva informacion 
         const nuevoPago = {};
         nuevoPago.concepto = concepto;
         nuevoPago.cantidad = cantidad;
         nuevoPago.fecha = fecha;

         //Guardar pago editado
         pago = await Pago.findOneAndUpdate({_id: req.params.id}, nuevoPago, {new: true});
         res.json({pago})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//Eliminar un pago
exports.eliminarPago = async (req, res) => {
    try {
        //Extraer el cliente y comprobar si existe
        const {cliente} = req.query;

        const existeCliente = await Cliente.findById(cliente);
        
        //Revisar si el pago existe
        let pago = await Pago.findById(req.params.id);
        if(!pago){
            return res.status(404).json({ msg: 'Pago no encontrado' })
        }

        //Revisar si el cliente pertenece al usuario autenticado
        if(existeCliente.creador.toString() !== req.user.id) {
            return res.status(401).send({msg: 'No autorizado'})
        }

        //Eliminar
        await Pago.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Pago eliminado'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}