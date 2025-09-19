import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx'

import '../index.css'


//Has the info about the page
function About() {
    return (
        <>
            <Header />
            <h1>About</h1>
            <p className='AboutDesc'> I created this site because I wanted to make a simple card list displayer
                for the one piece TCG that also kept track of the prices of the cards using data from TCGplayer. As of now
                you can search for cards and see the prices. The deck builder is a work in progress and will soon require an
                account to use , so you can save and update decks you create.
            </p>
            <Footer />
        </>
    )
}

export default About