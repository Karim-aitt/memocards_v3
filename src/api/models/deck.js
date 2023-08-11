const mongoose = require("mongoose");

//Define the schema for decks
const deckSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
}, { 
    timestamps: true,
    collection: 'decks'
});

//Export the deck schema model with the name 'Deck'
module.exports = mongoose.model('Deck', deckSchema);

