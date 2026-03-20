import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <>
            <Header />
            <div className='not-found'>
                <h1>404</h1>
                <p>This page doesn't exist.</p>
                <Link to='/'>Back to Card List</Link>
            </div>
            <Footer />
        </>
    )
}

export default NotFound
