const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const cardSchema = require('../models/card');
const deckSchema = require('../models/deck');

router.post('/card/add/:id', async (req, res) => {
    const { deck, text, solution } = req.body;
    const {id} = req.params
    //aqui obtener id del usuario

    const cardData = {
        deck: deck,
        text: text,
        solution: solution,
        created_by: id
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
router.get('/:deck/cards/:id', (req, res) => {
    const {deck, id} = req.params;
    console.log(deck, "deck get all cards")
  cardSchema
      .find({deck: deck, created_by: id})
      .then((data) => res.json(data))
      .catch((error) => res.json({message: error}))
})

router.delete('/cards/:id', (req, res) => {
  const {id} = req.params;
  console.log("delete, endpoint")
  cardSchema
        .deleteOne({_id: id})
        .then((data) => {
          console.log("Se ha borrado una carta")
          res.json(data)
        })
        .catch((error) => res.json({message: error}))
})

//update deck to add a card
// router.put('/deck/:id/add/card', (req, res) => {
//   const {id} = req.params;
//   const {front, back, created_by} = req.body;
//   deckSchema
//       .updateOne(
//           {_id: id}, 
//           {$set: {front, back, created_by}})
//       .then((data) => res.json(data))
//       .catch((error) => res.json({message: error}))
// })

//delete card

module.exports = router;