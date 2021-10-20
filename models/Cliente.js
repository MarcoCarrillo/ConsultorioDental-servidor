const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    edad: {
        type: Number,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: true,
        trim: true
    },
    tratamiento: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Cliente', ClienteSchema)