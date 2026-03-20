const express = require('express');
const router = express.Router();
const { getAllCards } = require('../public/scripts/dataBaseInteractions');
const { getDecks, saveDeck } = require('../public/scripts/fetchStoreDecks');
const { getCardData } = require('../public/scripts/fetchStoreCards');

// Get all cards
router.get('/getCards', async (_req, res) => {
    try {
        const cardData = await getAllCards();
        res.json(cardData);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
});

// Get only leaders
router.get('/getLeaders', async (_req, res) => {
    try {
        const cards = await getAllCards();
        const leaderCards = cards.filter(card => card.cardType === 'Leader');
        res.json(leaderCards);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch leaders' });
    }
});

// Get saved decks
router.get('/getDecks', async (_req, res) => {
    try {
        const decks = await getDecks();
        res.json(decks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch decks' });
    }
});

// Save a deck
router.post('/saveDeck', async (req, res) => {
    try {
        const { name, cards } = req.body;

        if (!name || typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({ error: 'Deck name is required' });
        }
        if (!Array.isArray(cards) || cards.length === 0) {
            return res.status(400).json({ error: 'Deck must contain at least one card' });
        }

        const savedDeck = await saveDeck({ name: name.trim(), cards });
        res.status(201).json(savedDeck);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save deck' });
    }
});

// Update card data from TCGPlayer
router.get('/update-cards', async (_req, res) => {
    try {
        const count = await getCardData();
        res.json({ success: true, message: `Updated ${count} cards` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
