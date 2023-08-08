const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config()
const deckSchema = require('../models/deck');
const cardSchema = require('../models/card');

router.post('/deck/add', async (req, res) => {
    const { name } = req.body;
    //aqui obtener id del usuario
   
    const deckData = {
        name: name
        // created_by: created_by
    }

    try {
    const newDeck = new deckSchema(deckData);
        await newDeck.save();
        res.status(201).json({ newDeck });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }

  });

//get all decks
router.get('/decks', (req, res) => {
  deckSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({message: error}))
})

//update a deckName
router.put('/cards/:id', (req, res) => {
  const {id} = req.params;
  const {front, back, created_by} = req.body;
  deckSchema
      .updateOne(
          {_id: id}, 
          {$set: {front, back, created_by}})
      .then((data) => res.json(data))
      .catch((error) => res.json({message: error}))
})

//delete deck
router.delete('/decks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Obtener el nombre del mazo a eliminar
    const deckToDelete = await deckSchema.findById(id);
    if (!deckToDelete) {
      return res.status(404).json({ message: 'Mazo no encontrado' });
    }
    // Borrar todas las cartas que pertenecen al mazo
    await cardSchema.deleteMany({ deck: deckToDelete.name });

    // Borrar el mazo en sí
    await deckSchema.deleteOne({ _id: id });

    res.json({ message: 'Mazo y cartas eliminadas exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el mazo y las cartas' });
  }
});

module.exports = router;