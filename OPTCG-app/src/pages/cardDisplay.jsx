import CardList from "../components/cardList"
import Header from "../components/header"
import Footer from "../components/footer"



export default function cardDisplay() {
    return (
        <>
            <Header />
            <CardList notInDeck={true} />
            <Footer />
        </>
    )
}