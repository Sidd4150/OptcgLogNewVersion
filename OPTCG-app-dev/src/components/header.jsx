import logo from '../assets/newLogo.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <img src={logo} alt="OPTCGLOG" className="logo" />

            <div className="nav-links">
                <Link to="/" className="cardlist">Card List</Link>
                <Link to="/deckBuilder" className="deckB">Deck Builder</Link>
                <Link to="/About" className="about">About</Link>
            </div>
        </header>
    )
}

export default Header;
