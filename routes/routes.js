const express = require('express');
const router = express.Router();
const path = require('path');
const { getAllCards } = require('../public/scripts/dataBaseInteractions');
const { getDecks, saveDeck } = require('../public/scripts/fetchStoreDecks');
const { getCardData } = require('../public/scripts/fetchStoreCards');

// Get all cards
router.get('/getCards', async (req, res) => {
    const cardData = await getAllCards();
    res.json(cardData);
});

// Get only leaders
router.get('/getLeaders', async (req, res) => {
    const cards = await getAllCards();
    const leaderCards = cards.filter(card => card.cardType === 'Leader');
    res.json(leaderCards);
});
// TODO: Add a parameter to send a color ex:Red, Blue, etc. To the header. use on the filter and return selected colored cards 
router.get('/getByColor', async (req, res) => {
    const cards = await getAllCards();
    const leaderCards = cards.filter(card => card.cardType === 'REPLACE WITH COLOR INPUT');
    res.json(leaderCards);
});

// Get saved decks
router.get('/getDecks', async (req, res) => {
    const decks = await getDecks();
    res.json(decks);
});

// Save a deck
router.post('/saveDeck', async (req, res) => {
    const deckData = req.body;
    const savedDeck = await saveDeck(deckData);
    res.status(201).json(savedDeck);
});
//updates cards 
router.get("/update-cards", async (req, res) => {
    try {
        const count = await getCardData();
        res.json({ success: true, message: `Updated ${count} cards` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
