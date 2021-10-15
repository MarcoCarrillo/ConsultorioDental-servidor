const express = require('express');

//Crear server 
const app = express();

//Puerto
const PORT = process.env.PORT || 4000;

//Pagina principal
app.get('/', (req, res) =>{
    res.send('Hola mundo')
})

//Arrancar server
app.listen( PORT, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});

