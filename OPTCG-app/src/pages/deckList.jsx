import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx'
import CardList from '../components/cardList.jsx'
import '../index.css'
import { useState, useEffect } from 'react'


function deckList() {
    const [deckCards, setDeckCards] = useState([])
    const [countOfCards, setCountOfCards] = useState({})
    const [uniqueCards, setUniqueCards] = useState([])
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



    return (
        <>
            <Header />
            <div className='layout'>

                <div className="CardDisplay_D">
                    <CardList notInDeck={false} setDeckCards={setDeckCards} DeckCards={deckCards} />
                </div>

                <div className='deck_controls'>Deck controls</div>
                <div className='DeckSection'>

                    {uniqueCards.map((card, index) => (
                        <div key={index} className="deck-card">
                            <img src={card.img} alt={card.cardName} className="deck-card-img" />
                            <p>{countOfCards[card.productID]}</p>
                        </div>
                    ))}
                </div>

            </div>
            <Footer />

        </>
    )
}

export default deckList