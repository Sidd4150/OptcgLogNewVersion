import Footer from '../components/footer.jsx'
import Header from '../components/header.jsx'
import Pagination from '../components/pagination.jsx'
import Search from '../components/search.jsx'
import { useState, useEffect } from 'react'
import '../index.css'

function cardList() {
    const [cards, setCards] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(30)
    const [selectedImage, setSelectedImage] = useState(null);
    const [bigCardObj, setBigCardObj] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/getCards`)
            .then(response => response.json())  // Parse JSON response
            .then(data => setCards(data))
    }, [])

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentCards = cards.slice(firstPostIndex, lastPostIndex)
    const totalPages = Math.ceil(cards.length / postPerPage);

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };


    const handleImgClick = (cardbig) => {
        setSelectedImage(cardbig.img);
        setBigCardObj(cardbig)
    };
    const handleCloseImage = () => {
        setSelectedImage(null);
        setBigCardObj(null)
    };




    return (
        <>
            <Header />
            <Search />

            <div className="card_area">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPreviousPage}
                />


                <ul>
                    {currentCards.map((card, index) => (
                        <div className="cards" key={index} >

                            <img className="cardIMG" src={card.img} alt={card.cardName} onClick={() => { handleImgClick(card) }} />
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
                            <h1>{bigCardObj.cardName}</h1>
                            <p>{bigCardObj.desc}</p>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    )
}

export default cardList
