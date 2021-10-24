const Cargo = require('../models/Cargo');
const Cliente = require('../models/Cliente');
const {validationResult} = require('express-validator')

//Crea un nuevo cargo
exports.crearCargo = async (req, res) => {
    
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

        //Crear el cargo
        const cargo = new Cargo(req.body);
        await cargo.save();
        res.json(cargo); 

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}


//Obtener los cargos por clientes 
exports.obtenerCargos = async (req, res) => {

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

        //Obtener los cargos por clientes 
        const cargos = await Cargo.find({ cliente });
        res.json({cargos});


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}


//Actualizar un cargo
exports.actualizarCargo = async (req, res) => {
    try {
        //Extraer el cliente y comprobar si existe
        const {cliente, concepto, cantidad} = req.body;

        const existeCliente = await Cliente.findById(cliente);
        
        //Revisar si el cargo existe
        let cargo = await Cargo.findById(req.params.id);
        if(!cargo){
            return res.status(404).json({ msg: 'Cargo no encontrado' })
        }

        //Revisar si el cliente pertenece al usuario autenticado
        if(existeCliente.creador.toString() !== req.user.id) {
            return res.status(401).send({msg: 'No autorizado'})
        }

        //Crear un objeto con el nuevo cargo
        const nuevoCargo = {};

        if(concepto) nuevoCargo.concepto = concepto;
        if(cantidad) nuevoCargo.cantidad = cantidad;

        //Guardar el cargo actualizado
        cargo = await Cargo.findOneAndUpdate({_id: req.params.id}, nuevoCargo, {new: true});
        res.json({cargo})


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}


//Eliminar un cargo
exports.eliminarCargo = async (req, res) => {
    try {
        //Extraer el cliente y comprobar si existe
        const {cliente} = req.body;

        const existeCliente = await Cliente.findById(cliente);
        
        //Revisar si el cargo existe
        let cargo = await Cargo.findById(req.params.id);
        if(!cargo){
            return res.status(404).json({ msg: 'Cargo no encontrado' })
        }

        //Revisar si el cliente pertenece al usuario autenticado
        if(existeCliente.creador.toString() !== req.user.id) {
            return res.status(401).send({msg: 'No autorizado'})
        }

        //Eliminar
        await Cargo.findOneAndRemove({_id : req.params.id});
        res.json({msg: 'Cargo eliminado'})


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}