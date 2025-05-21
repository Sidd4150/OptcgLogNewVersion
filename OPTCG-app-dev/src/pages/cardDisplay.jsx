import CardList from "../components/cardList"
import Header from "../components/header"
import Footer from "../components/footer"


//Card display so I can use cardlist without headers in the decklist
export default function cardDisplay() {
    return (
        <>
            <Header />
            <CardList notInDeck={true} />
            <Footer />
        </>
    )
}