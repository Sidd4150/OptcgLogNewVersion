
import '../index.css'
import { useState, useEffect } from 'react'


export default function Search({ cards, setDisplayCards, displayCards, currPage }) {
    const [query, setQuery] = useState("")


    //Handles when you press submit after entering a search in the search bar
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
    //handles the filter changes to filter the cards based on your choice
    const handleFilter = async (e) => {
        const selectedFilter = e.target.value;

        let filteredCards = [...displayCards];

        if (selectedFilter === "Desc") {

            filteredCards.sort((a, b) => b.price - a.price);
            setDisplayCards(filteredCards);
        } else if (selectedFilter === "Price Ascending") {

            filteredCards.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            setDisplayCards(filteredCards);
        } else if (selectedFilter === "leaders") {

            fetch(`http://127.0.0.1:3000/getLeaders`)
                .then(response => response.json())  // Parse JSON response
                .then(data => {

                    setDisplayCards(data)
                })
        }

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
                    <option value="leaders">Leaders</option>
                </select>

            </form>


        </ div>
    )
}