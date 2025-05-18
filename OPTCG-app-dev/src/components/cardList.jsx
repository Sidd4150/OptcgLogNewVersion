
import Pagination from './pagination.jsx'
import Search from './search.jsx'
import { useState, useEffect } from 'react'
import '../index.css'

function cardList({ notInDeck, setDeckCards, DeckCards }) {

    const [cards, setCards] = useState([])
    const [displayCards, setDisplayCards] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(30)
    const [selectedImage, setSelectedImage] = useState(null);
    const [bigCardObj, setBigCardObj] = useState(null)
    const [hoveredCard, setHoveredCard] = useState(null);


    useEffect(() => {
        fetch(`http://127.0.0.1:3000/getCards`)
            .then(response => response.json())  // Parse JSON response
            .then(data => {
                setCards(data)
                setDisplayCards(data)
            })


    }, [])




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


    const handleImgClick = (cardbig) => {
        if (notInDeck) {
            setSelectedImage(cardbig.img);
            setBigCardObj(cardbig)
        } else {
            if (DeckCards.filter(c => c.cardName === cardbig.cardName).length < 4) {
                setDeckCards(DeckCards => [...DeckCards, cardbig])
            } else {
                alert("can only have 4 of the same card in a deck")
            }


        }

    };
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
