const mongoose = require('mongoose');
const connectDB = require('../../modules/db.js')

//database connection
const BatchSize = 100;


connectDB(true)
//schema for cards
let dataSchema = new mongoose.Schema({
    productID: {
        type: String,
        unique: true
    },
    cardName: String,
    marketPrice: String,
    img: String,
    desc: String,
    color: String,
    cardType: String,
    rarity: String,
    price: Number,


})

const Cards = mongoose.model('Cards', dataSchema);

//Get the data from the url 
async function fetchJsonData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        return jsonData; // Return the parsed JSON data

    } catch (error) {
        console.error('Error fetching JSON:', error);
        return null;
    }
}


//Get the group Ids from tcgcsv website
async function getGroupIDs() {
    const data = await fetchJsonData(`https://tcgcsv.com/tcgplayer/68/groups`)
    const groupIds = []
    for (i = 0; i < data.results.length; i++) {
        groupIds.push(data.results[i].groupId)
    }
    console.log("Finished getting Ids")
    return groupIds

}
//get price data from the tcgcsv website and also map the prices by the product ID to match to cards
async function getPriceData() {
    let Map = {}
    const groupIds = await getGroupIDs()
    for (const id of groupIds) {
        const data = await fetchJsonData(`https://tcgcsv.com/tcgplayer/68/${id}/prices`)
        for (const priceData of data.results) {
            Map[priceData.productId] = priceData.marketPrice
        }
    }
    return Map
}

//Get the cards by their ids 
async function getCardData() {
    let batch = []
    const prices = await getPriceData()
    const groupIds = await getGroupIDs()
    let count = 0
    for (const id of groupIds) {
        const data = await fetchJsonData(`https://tcgcsv.com/tcgplayer/68/${id}/products`)
        for (const cardData of data.results) {
            if (cardData.extendedData.length >= 3 && !cardData.name.includes("Deck") && !cardData.name.includes("Pack") && !cardData.name.includes("Booster")) {

                let color = '';
                let cardType = '';
                let rarity = '';
                let Description = '';
                let price = '';


                for (const extended of cardData.extendedData) {
                    if (extended.name == "Color") {
                        color = extended.value;
                    } else if (extended.name == "CardType") {
                        cardType = extended.value
                    } else if (extended.name == "Rarity") {
                        rarity = extended.value
                    } else if (extended.name == "Description") {
                        Description = extended.value
                    }
                }
                price = prices[cardData.productId] || "No Price Data"
                //create batchs to make it faster
                batch.push({
                    productID: cardData.productId,
                    cardName: cardData.name,
                    img: `https://tcgplayer-cdn.tcgplayer.com/product/${cardData.productId}_in_1000x1000.jpg`,
                    desc: Description,
                    color: color,
                    cardType: cardType,
                    rarity: rarity,
                    price: price,
                })

                if (batch.length >= BatchSize) {
                    await insertBatch(batch)
                    batch = []
                }

                count += 1
            }


        }
    }

    console.log(count)

}
//batch insert
async function insertBatch(batch) {
    try {

        const result = await Cards.insertMany(batch, { ordered: false });
        console.log("Inserted Batch", result.length)
    } catch (err) {
        if (err.writeErrors) {
            console.warn(`Some duplicates skipped in batch.`);

        } else {
            console.error(err);

        }
    }
}

getCardData().then(() => {
    console.log(" Done fetching and inserting cards.");
    mongoose.disconnect();
})

module.exports = { getCardData };




