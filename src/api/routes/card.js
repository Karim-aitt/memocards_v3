const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config()
const cardSchema = require('../models/card');
const deckSchema = require('../models/deck');

router.post('/card/add', async (req, res) => {
    const { deck, front, back, created_by } = req.body;
    //aqui obtener id del usuario

    const cardData = {
        deck: deck,
        front: front,
        back: back,
        created_by: created_by
    }

    try {
    const newCard = new cardSchema(cardData);
        await newCard.save();
        res.status(201).json({ newCard });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }

  });

//get all cards
router.get('/cards', (req, res) => {
  cardSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({message: error}))
})

//get all cards in Deck
router.get('/deck/cards', (req, res) => {
    const {deck} = req.body;
  cardSchema
      .find(deck)
      .then((data) => res.json(data))
      .catch((error) => res.json({message: error}))
})

//update deck to add a card
router.put('/deck/:id/add/card', (req, res) => {
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
  cardSchema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
})

module.exports = router;