import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx'

import '../index.css'


//Has the info about the page
function About() {
    return (
        <>
            <Header />
            <h1>About</h1>
            <p className='AboutDesc'>This is a site where you can search for cards and also build decks to build the perfect deck. I've used similar sites to this but found their sites confusing
                so I tried to create a simple site that is fun to look at that accopblish the goal of searching cards and building decks.
                In this project you can search for cards and see the prices. So if you wanted to check for the price of a card because you wanted to buy it you can.
                Or if you just want to see what the most expensive card is you can. The deck builder allows you to build your decks and save them. So if you are thinking
                of creating a new deck and want to see how much it cost this is the place.
            </p>
            <Footer />
        </>
    )
}

export default About