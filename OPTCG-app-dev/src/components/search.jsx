
import '../index.css'
import { useState, useEffect } from 'react'


export default function Search({ cards, setDisplayCards, displayCards, currPage }) {
    const [query, setQuery] = useState("")



    const handleSubmit = (e) => {
        e.preventDefault();
        if (query === "") {
            setDisplayCards(cards)
        } else {
            const queryResult = cards.filter(card =>
                card.cardName.toLowerCase().includes(query.toLowerCase())
            );

            setDisplayCards(queryResult)


        }
        currPage(1)
        setQuery("")

    }

    const handleFilter = (e) => {
        const selectedFilter = e.target.value;

        let filteredCards = [...displayCards];

        if (selectedFilter === "Desc") {

            filteredCards.sort((a, b) => b.price - a.price);
        } else if (selectedFilter === "Price Ascending") {

            filteredCards.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }

        setDisplayCards(filteredCards);
        e.target.value = ""

    }






    return (
        <div className="Search" >
            <form onSubmit={handleSubmit}>

                <input type="text" className="searchBar" placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <input type="submit" value="Search" className="submit" />

                <select className="filter" onChange={handleFilter}>
                    <option value="">filter...</option>
                    <option value="Desc">Price Descending</option>
                    <option>Price Ascending</option>
                </select>

            </form>


        </ div>
    )
}