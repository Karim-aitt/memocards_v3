const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config()
const deckSchema = require('../models/deck');

router.post('/deck/add', async (req, res) => {
    const { name } = req.body;
    //aqui obtener id del usuario
    console.log(name, "name")
    const deckData = {
        name: name
        // created_by: created_by
    }
    
    console.log("DECK ADDDDDDDDDDDDDDDDDDDDD")

    try {
    const newDeck = new deckSchema(deckData);
        await newDeck.save();
        console.log("OK")
        res.status(201).json({ newDeck });
      } catch (err) {
        console.log("error")
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

//update a single card
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

//delete card
router.delete('cards/:id', (req, res) => {
  const {id} = req.params;
  deckSchema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
})

module.exports = router;