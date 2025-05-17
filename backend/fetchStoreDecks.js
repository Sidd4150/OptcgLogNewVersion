const mongoose = require('mongoose');
const connectDB = require('/Users/sid/CS386/FINAL/backend/modules/db.js')



let dataDeckSchema = new mongoose.Schema({
    name: String,
    cards: [{ productID: String, quantity: Number }],

})

const Decks = mongoose.model('Decks', dataDeckSchema);

async function getDecks() {
    return await Decks.find({})
}

async function saveDeck(data) {
    const newDeck = new Decks(data)
    return await newDeck.save()

}
module.exports = { getDecks, saveDeck };