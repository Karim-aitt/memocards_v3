const mongoose = require("mongoose");

//Define the schema for cards
const cardSchema = mongoose.Schema({
    deck: {
        type: String,
        required: true,
    },
    front: {
        type: String,
        required: true
    },
    back: {
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
    collection: 'cards'
});

//Export the card schema model with the name 'Card'
module.exports = mongoose.model('Card', cardSchema);

