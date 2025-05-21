import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx'
import CardList from '../components/cardList.jsx'
import '../index.css'
import { useState, useEffect } from 'react'

//deck list with deck builder
function deckList() {

    //hooks
    const [deckCards, setDeckCards] = useState([])
    const [countOfCards, setCountOfCards] = useState({})
    const [uniqueCards, setUniqueCards] = useState([])
    const [fetchedDecks, setFetchedDecks] = useState([]);

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
            alert("Deck is empty!");
            return;
        }

        const deckName = prompt("Enter a name for your deck:");
        if (!deckName) return;

        const cardsToSave = uniqueCards.map(card => ({
            productID: card.productID,
            quantity: countOfCards[card.productID]
        }));
        console.log("Sending to server:", {
            name: deckName,
            cards: cardsToSave
        });

        fetch('http://127.0.0.1:3000/saveDeck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: deckName,
                cards: cardsToSave
            })
        })
    }
    //get deck which will get the deck from the mongoDB
    const handleGetDeck = () => {
        fetch('http://127.0.0.1:3000/getDecks')
            .then(res => res.json())
            .then(data => setFetchedDecks(data))
    }

    //Gets all cards to rebuild the deck after a get deck
    const fetchAllCards = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/getCards');
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
                    <div className='deck_controls'>Deck deck_controls
                        <input type='submit' value='Clear' className='Clear' onClick={handleClear} />
                        <input type='submit' value='Save Deck' className='SaveDeck' onClick={handleSaveDeck} />
                        <input type='submit' value='Get Decks' className='getDeck' onClick={handleGetDeck} />

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

                        {uniqueCards.map((card, index) => (
                            <div key={index} className="deck-card">
                                <img src={card.img} alt={card.cardName} className="deck-card-img" />
                                <p className='count_of_cards'>{countOfCards[card.productID]}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />

        </>
    )
}

export default deckList