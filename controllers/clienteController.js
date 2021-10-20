const Cliente = require('../models/Cliente');

exports.crearCliente = async (req, res) => {

    try {
        //Crear un nuevo cliente
        const cliente = new Cliente(req.body);
        cliente.save();
        res.json(cliente);
        console.log(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}