import logo from '../assets/newLogo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header>
            <img src={logo} alt="OPTCGLOG" className="logo" />

            <button className="hamburger" onClick={() => setMenuOpen(prev => !prev)}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
                <Link to="/" className="cardlist" onClick={() => setMenuOpen(false)}>Card List</Link>
                <Link to="/deckBuilder" className="deckB" onClick={() => setMenuOpen(false)}>Deck Builder</Link>
                <Link to="/About" className="about" onClick={() => setMenuOpen(false)}>About</Link>
            </div>
        </header>
    )
}

export default Header;
