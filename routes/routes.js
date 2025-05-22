const express = require('express');
const router = express.Router();
const path = require('path');
const { getAllCards } = require('../public/scripts/dataBaseInteractions');
const { getDecks, saveDeck } = require('../public/scripts/fetchStoreDecks');
app.use(express.json());
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

module.exports = router;
