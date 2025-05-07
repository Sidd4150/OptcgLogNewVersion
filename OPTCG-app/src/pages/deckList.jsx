import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx'
import CardList from './cardList.jsx'
import '../index.css'



function deckList() {
    return (
        <>
            <Header />
            <div className='layout'>

                <div className="CardDisplay_D">
                    <CardList />
                </div>

                <div className='DeckSection'>
                    Deck Section
                </div>

            </div>
            <Footer />
        </>
    )
}

export default deckList