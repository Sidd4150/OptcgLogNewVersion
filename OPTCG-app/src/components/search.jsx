
import '../index.css'


export default function Search() {




    return (
        <div className="Search" >
            <input type="text" className="searchBar" placeholder="Search" />


            <input type="button" value="Search" className="submit" />

            <select className="filter">
                <option>filter...</option>
                <option>Price Descending</option>
                <option>Price Ascending</option>
                <option>Color</option>
                <option>Cost</option>
            </select>

        </ div>
    )
}