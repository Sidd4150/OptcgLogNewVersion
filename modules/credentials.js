require('dotenv').config();  // Load environment variables from .env

const un = process.env.MONGO_USER;
const pw = process.env.MONGO_PASS;


module.exports = {
    mongo: {
        connectionString: `mongodb+srv://${un}:${pw}@fullstackwebdev.xjlmih6.mongodb.net/OnePieceCardsExtended?retryWrites=true&w=majority&appName=fullstackwebdev`
    }
};

