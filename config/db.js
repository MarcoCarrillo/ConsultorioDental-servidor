const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO);
        console.log('DB conectada');
    } catch (error) {
        console.log(error);
        //En caso de error detener la app
        process.exit(1);
    }
}

module.exports = conectarDB;