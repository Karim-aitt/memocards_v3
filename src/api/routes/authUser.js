const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/auth-verification', (req, res) => {

    //Conseguimos el token del header de la req
    const token = req.header('auth-token');
    
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(verified){
            console.log("Verificado con exito")
            res.json(true)
        }
        

    } catch (error) {
        
        res.status(400).json({error: 'token no es válido'})
    }
});

module.exports = router;