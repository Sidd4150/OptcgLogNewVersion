import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/cardDisplay.jsx'
import DeckBuild from './pages/deckList.jsx'
import About from './pages/about.jsx'


function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/deckBuilder' element={<DeckBuild />} />
				<Route path='/About' element={<About />} />
			</Routes>
		</Router>
	)
}

export default App
