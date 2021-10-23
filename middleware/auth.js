const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //Leer el token del header
    const token = req.header('x-auth-token');
    // console.log(token);

    //Revisar si no hay token
    if(!token){
        res.status(401).json({msg: 'No hay token, permiso no valido'});
    }

    //Validar token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.user = cifrado.user;
        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({msg: 'Token no valido'})
    }
}