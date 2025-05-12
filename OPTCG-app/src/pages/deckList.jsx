import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx'
import CardList from '../components/cardList.jsx'
import '../index.css'



function deckList() {
    const [deckCards, setDeckCards] = useState([])


    return (
        <>
            <Header />
            <div className='layout'>

                <div className="CardDisplay_D">
                    <CardList notInDeck={false} />
                </div>
                ``
                <div className='DeckSection'>
                    Deck Section
                </div>

            </div>
            <Footer />
        </>
    )
}

export default deckList