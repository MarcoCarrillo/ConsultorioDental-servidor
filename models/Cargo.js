const mongoose = require('mongoose');

const CargoSchema = mongoose.Schema({
    concepto: {
        type: String,
        required: true,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true,
        trim: true
    },
    fecha: {
        type: String,
        required: true,
        trim: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Cargo', CargoSchema)