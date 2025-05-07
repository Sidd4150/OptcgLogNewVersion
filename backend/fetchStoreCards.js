const mongoose = require('mongoose');
const connectDB = require('/Users/sid/CS386/FINAL/backend/modules/db.js')

//database connection
const BatchSize = 100;


connectDB(true)
let dataSchema = new mongoose.Schema({
    productID: {
        type: String,
        unique: true
    },
    cardName: {
        type: String,
    },
    marketPrice: {
        type: String,
    },
    img: {
        type: String,
    },
    desc: {
        type: String,
    }
})

const Cards = mongoose.model('Cards', dataSchema);


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
        return null; // Or throw the error, depending on your error handling strategy
    }
}



async function getGroupIDs() {
    const data = await fetchJsonData(`https://tcgcsv.com/tcgplayer/68/groups`)
    const groupIds = []
    for (i = 0; i < data.results.length; i++) {
        groupIds.push(data.results[i].groupId)
    }
    console.log("Finished getting Ids")
    return groupIds

}


async function getCardData() {
    let batch = []
    const groupIds = await getGroupIDs()
    let count = 0
    for (const id of groupIds) {
        const data = await fetchJsonData(`https://tcgcsv.com/tcgplayer/68/${id}/products`)
        for (const cardData of data.results) {
            if (cardData.extendedData.length >= 3 && !cardData.name.includes("Deck") && !cardData.name.includes("Pack") && !cardData.name.includes("Booster")) {


                batch.push({
                    productID: cardData.productId,
                    cardName: cardData.name,
                    img: `https://tcgplayer-cdn.tcgplayer.com/product/${cardData.productId}_in_1000x1000.jpg`,
                    desc: cardData.extendedData[2].value
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






