const mongoose = require('mongoose');
const connectDB = require('/Users/sid/CS386/FINAL/backend/modules/db.js')


connectDB(true);

const Cards = mongoose.model('Cards', new mongoose.Schema({}, { strict: false }));

async function getAllCards() {
    console.log("Sending card data...")

    const cards = await Cards.find({});
    console.log(cards.length);
    return cards;

}

module.exports = { getAllCards };