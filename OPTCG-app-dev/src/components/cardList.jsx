
import Pagination from './pagination.jsx'
import Search from './search.jsx'
import { useState, useEffect } from 'react'
import '../index.css'

const apiUrl = import.meta.env.API_URL;

function cardList({ notInDeck, setDeckCards, DeckCards }) {
    // all the useState hooks 
    const [cards, setCards] = useState([])
    const [displayCards, setDisplayCards] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(30)
    const [selectedImage, setSelectedImage] = useState(null);
    const [bigCardObj, setBigCardObj] = useState(null)
    const [hoveredCard, setHoveredCard] = useState(null);

    //when the application is started it gets all the cards once 
    useEffect(() => {
        fetch(`https://optcglognewversion.onrender.com/getCards`)  // Fetch data from the API endpoint
            .then(response => response.json())  // Parse JSON response
            .then(data => {
                setCards(data)
                setDisplayCards(data)
            })


    }, [])



    //paginatiion constants
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentCards = displayCards.slice(firstPostIndex, lastPostIndex)
    const totalPages = Math.ceil(displayCards.length / postPerPage);

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    //handles when an image is clicked 
    const handleImgClick = (cardbig) => {
        // if the cardList is not in the deck it enlarges the image and gives card info
        if (notInDeck) {
            setSelectedImage(cardbig.img);
            setBigCardObj(cardbig)
        } else {
            //if not it adds the card clicked and adds it to the deck 

            if (DeckCards.filter(c => c.cardName === cardbig.cardName).length < 4) {
                setDeckCards(DeckCards => [...DeckCards, cardbig])
            } else {
                alert("can only have 4 of the same card in a deck")
            }


        }

    };

    //closes enlarged image 
    const handleCloseImage = () => {
        setSelectedImage(null);
        setBigCardObj(null)
    };




    return (
        <>

            <Search cards={cards} setDisplayCards={setDisplayCards} displayCards={displayCards} currPage={setCurrentPage} />

            <div className="card_area">

                <div className="PagnationDiv" >
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </div>

                <ul>
                    {currentCards.map((displayCards, index) => (
                        <div className="cards"
                            key={index}
                            onMouseEnter={() => setHoveredCard(displayCards)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >

                            <img className={`cardIMG ${!notInDeck ? 'notInDeck' : ''}`}
                                src={displayCards.img}
                                alt={displayCards.cardName}
                                onClick={() => { handleImgClick(displayCards) }}

                            />
                        </div>
                    ))}
                </ul>
                {selectedImage && (
                    <div className="modal" onClick={handleCloseImage}>
                        <div className='card_info' onClick={(e) => e.stopPropagation()}>
                            <img
                                className="large-image"
                                src={selectedImage}
                                alt="Enlarged card"
                            />

                            <h1 className='bigName'>{bigCardObj.cardName}</h1>
                            <p className='bigDesc'>{bigCardObj.desc}
                                {bigCardObj.color}
                            </p>



                            <p className='bigPrice'>The market price: ${bigCardObj.price.toFixed(2)}</p>
                        </div>
                    </div>
                )}
                {!notInDeck && hoveredCard && (
                    <div className='hoverCard'>
                        <img src={hoveredCard.img} alt={hoveredCard.cardName} />
                    </div>
                )}
            </div>


        </>
    )
}

export default cardList
