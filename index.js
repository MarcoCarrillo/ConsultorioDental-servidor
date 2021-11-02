const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');


//Crear server 
const app = express();

//Conectar DB
conectarDB();

//Habilitar CORS
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

//Habilitar express.json
app.use(express.json( {extended: true} ));

//Puerto
const PORT = process.env.PORT || 4000;

//Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/cargos', require('./routes/cargos'));
app.use('/api/pagos', require('./routes/pagos'));

//Pagina principal
app.get('/', (req, res) =>{
    res.send('Hola mundo')
})

//Arrancar server
app.listen( PORT, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});

