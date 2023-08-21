const express = require('express');
const userSchema = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config()

//register user
router.post('/user/register', async (req, res) => {
    const { name, email, password } = req.body;

    console.log(name,email,password)
    
    try {
        // Comprobar si ya existe un usuario con el email introducido
        const userExist = await userSchema.findOne({ email });
        const nameExist = await userSchema.findOne({ name });
        if (userExist) {
          return res.status(401).json({ message: 'El email ya está registrado' });
        }
        if(nameExist){
          return res.status(402).json({message: "El nombre ya está registrado"})
        }
        
        //TODO: HACER VALIDACIONES del usuario


        // Si el email no está registrado, crear un nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userSchema({ name, email, password: hashedPassword });
        
        await newUser.save();

        console.log(newUser, "newUser")

        const payload = {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email
        };
        
        // Si el usuario y la contraseña son correctos, generar un token de acceso
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200).header('auth-token', token).json({ id: newUser._id, name: newUser.name, email: newUser.email, token });


      } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
      }
  });

//login user
router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Buscar al usuario por email y Comprobar si la contraseña es correcta
      const user = await userSchema.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: 'Credenciales incorrectas' });
        } 

      const isMatch = await bcrypt.compare(password, user.password);  
      if (!isMatch) {
          return res.status(402).json({ message: 'Credenciales incorrectas' });
      }
    
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email
      };

      // Si el usuario y la contraseña son correctos, generar un token de acceso
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

      res.header('auth-token', token).json({ user, token });

    } catch (err) {
        console.log("catch API login")
        res.status(400).json({ message: err.message });
        }
});





//get all users
router.get('/users', (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
})

//get single user
router.get('/users/:id', (req, res) => {
    const {id} = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
})

//update a single user
router.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, password, email} = req.body;
    userSchema
        .updateOne(
            {_id: id}, 
            {$set: {name, password, email}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
})
//delete user
router.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    userSchema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
})










module.exports = router;