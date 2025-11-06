const mongoose = require('mongoose');
const connectDB = require('../../modules/db.js')

// database connection (WAIT for it)
connectDB(true)

const BatchSize = 100;

// schema
let dataSchema = new mongoose.Schema({
    productID: { type: String, unique: true },
    cardName: String,
    img: String,
    desc: String,
    color: String,
    cardType: String,
    rarity: String,
    price: Number,
})

const Cards = mongoose.models.Cards || mongoose.model('Cards', dataSchema);

// fetch JSON
async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return null;
    }
}

// get group IDs
async function getGroupIDs() {
    const data = await fetchJsonData(`https://tcgcsv.com/tcgplayer/68/groups`);
    if (!data?.results) return [];
    return data.results.map(x => x.groupId);
}

// get prices
async function getPriceData() {
    const groupIds = await getGroupIDs();
    let priceMap = {};

    for (const id of groupIds) {
        const data = await fetchJsonData(`https://tcgcsv.com/tcgplayer/68/${id}/prices`);
        if (!data?.results) continue;

        for (const p of data.results) {
            priceMap[p.productId] = p.marketPrice;
        }
    }
    return priceMap;
}

// MAIN FUNCTION ✅ FIXED
async function getCardData() {
    console.log("Starting card update...");

    const groupIds = await getGroupIDs();
    const prices = await getPriceData();

    let batch = [];
    let count = 0;

    for (let id of groupIds) {
        const data = await fetchJsonData(`https://tcgcsv.com/tcgplayer/68/${id}/products`);
        if (!data?.results) continue;

        for (const cardData of data.results) {
            if (
                cardData.extendedData.length >= 3 &&
                !cardData.name.includes("Deck") &&
                !cardData.name.includes("Pack") &&
                !cardData.name.includes("Booster")
            ) {
                let color = '', cardType = '', rarity = '', desc = '';

                for (const ext of cardData.extendedData) {
                    if (ext.name === "Color") color = ext.value;
                    if (ext.name === "CardType") cardType = ext.value;
                    if (ext.name === "Rarity") rarity = ext.value;
                    if (ext.name === "Description") desc = ext.value;
                }

                batch.push({
                    productID: String(cardData.productId),
                    cardName: cardData.name,
                    img: `https://tcgplayer-cdn.tcgplayer.com/product/${cardData.productId}_in_1000x1000.jpg`,
                    desc,
                    color,
                    cardType,
                    rarity,
                    price: Number(prices[cardData.productId] || 0),
                });

                if (batch.length >= BatchSize) {
                    await insertBatch(batch);
                    batch = [];
                }

                count++;
            }
        }
    }

    // ✅ FIX: Insert leftover batch
    if (batch.length > 0) {
        await insertBatch(batch);
    }

    console.log(`✅ Done. Total cards processed: ${count}`);
    return count;
}

// batch insert
async function insertBatch(batch) {
    try {
        const bulkOps = batch.map(card => ({
            updateOne: {
                filter: { productID: card.productID },
                update: { $set: card },
                upsert: true,
            },
        }));

        const result = await Cards.bulkWrite(bulkOps, { ordered: false });
        console.log(`Inserted: ${result.upsertedCount}, Updated: ${result.modifiedCount}`);
    } catch (err) {
        console.error("Batch insert/update error:", err);
    }
}

module.exports = { getCardData };
