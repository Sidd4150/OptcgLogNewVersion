import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx'

import '../index.css'



function About() {
    return (
        <>
            <Header />
            <h1>About</h1>
            <p className='AboutDesc'>This is a site where you can search for cards and also build decks to build the perfect deck</p>
            <Footer />
        </>
    )
}

export default About