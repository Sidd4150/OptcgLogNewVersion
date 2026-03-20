import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx'
import CardList from '../components/cardList.jsx'
import '../index.css'
import { useState, useEffect } from 'react'

const apiURL = import.meta.env.VITE_API_URL;

//deck list with deck builder
function DeckList() {

    //hooks
    const [deckCards, setDeckCards] = useState([])
    const [countOfCards, setCountOfCards] = useState({})
    const [uniqueCards, setUniqueCards] = useState([])
    const [fetchedDecks, setFetchedDecks] = useState([]);
    const [showSaveModal, setShowSaveModal] = useState(false)
    const [deckNameInput, setDeckNameInput] = useState('')
    const [saveError, setSaveError] = useState(null)

    //when deck cards is changed it runs this which creates a map of the deck cards so I can add a count
    //to the cards so the deck doesnt have duplicated cards
    useEffect(() => {

        const countMap = {};

        deckCards.forEach(card => {
            const id = card.productID;
            countMap[id] = (countMap[id] || 0) + 1;
        });

        setCountOfCards(countMap)
        const unique = [...new Set(deckCards.map(card => card.productID))]
            .map(id => deckCards.find(card => card.productID === id));

        setUniqueCards(unique);
    }, [deckCards])

    const handleClear = () => {
        setUniqueCards([])
        setDeckCards([])
    }

    const totalCost = deckCards.reduce((sum, card) => sum + (card.price || 0), 0);

    const handleSaveDeck = () => {
        if (uniqueCards.length === 0) {
            setSaveError("Your deck is empty — add some cards first.")
            return;
        }
        setSaveError(null)
        setShowSaveModal(true)
    }

    const handleConfirmSave = () => {
        if (!deckNameInput.trim()) {
            setSaveError("Please enter a deck name.")
            return;
        }

        const cardsToSave = uniqueCards.map(card => ({
            productID: card.productID,
            quantity: countOfCards[card.productID]
        }));

        fetch(`${apiURL}saveDeck`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: deckNameInput.trim(), cards: cardsToSave })
        })

        setShowSaveModal(false)
        setDeckNameInput('')
        setSaveError(null)
    }

    const handleCancelSave = () => {
        setShowSaveModal(false)
        setDeckNameInput('')
        setSaveError(null)
    }
    //get deck which will get the deck from the mongoDB
    const handleGetDeck = () => {
        fetch(`${apiURL}getDecks`)
            .then(res => res.json())
            .then(data => setFetchedDecks(data))
    }

    //Gets all cards to rebuild the deck after a get deck
    const fetchAllCards = async () => {
        try {
            const response = await fetch(`${apiURL}getCards`);
            const data = await response.json();
            return data; // This is your full card list
        } catch (error) {
            console.error('Failed to fetch all cards:', error);
            return [];
        }
    };
    //load deck uses all the cards and matches with the ids from mongodb to recreate saved decks
    const loadDeck = async (deck) => {
        const allCardData = await fetchAllCards();
        const cards = [];

        deck.cards.forEach(({ productID, quantity }) => {
            const cardInfo = allCardData.find(card => card.productID === productID);
            if (cardInfo) {
                for (let i = 0; i < quantity; i++) {
                    cards.push({ ...cardInfo });
                }
            }
        });

        setDeckCards(cards);
    };

    return (
        <>
            <Header />
            <div className='layout'>

                <div className="CardDisplay_D">
                    <CardList notInDeck={false} setDeckCards={setDeckCards} DeckCards={deckCards} />
                </div>

                <div className='Deck_Wrapper'>
                    <div className='deck_controls'>
                        <input type='submit' value='Clear' className='Clear' onClick={handleClear} />
                        <input type='submit' value='Save Deck' className='SaveDeck' onClick={handleSaveDeck} />
                        <input type='submit' value='Get Decks' className='getDeck' onClick={handleGetDeck} />
                        {saveError && <p className='deck-error'>{saveError}</p>}

                        <p>Total Cost of your deck is ${totalCost.toFixed(2)}</p>
                        {fetchedDecks.length > 0 && (
                            <div className='FetchedDecks'>
                                <h3>Saved Decks:</h3>
                                <ul>
                                    {fetchedDecks.map((deck, idx) => (
                                        <li key={idx}>
                                            <button onClick={() => loadDeck(deck)}>
                                                {deck.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className='DeckSection'>

                        {uniqueCards.map((card) => (
                            <div key={card.productID} className="deck-card">
                                <img src={card.img} alt={card.cardName} className="deck-card-img" />
                                <p className='count_of_cards'>{countOfCards[card.productID]}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />

            {showSaveModal && (
                <div className='modal' onClick={handleCancelSave}>
                    <div className='save-deck-modal' onClick={(e) => e.stopPropagation()}>
                        <h2>Name Your Deck</h2>
                        <input
                            type='text'
                            className='deck-name-input'
                            placeholder='e.g. Luffy Aggro'
                            value={deckNameInput}
                            onChange={(e) => setDeckNameInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleConfirmSave()}
                            autoFocus
                        />
                        {saveError && <p className='deck-error'>{saveError}</p>}
                        <div className='save-modal-actions'>
                            <button className='save-modal-cancel' onClick={handleCancelSave}>Cancel</button>
                            <button className='save-modal-confirm' onClick={handleConfirmSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeckList