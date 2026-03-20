import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/cardDisplay.jsx'
import DeckBuild from './pages/deckList.jsx'
import About from './pages/about.jsx'
import NotFound from './pages/notFound.jsx'


function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/deckBuilder' element={<DeckBuild />} />
				<Route path='/About' element={<About />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default App
