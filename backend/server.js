const host = '127.0.0.1', port = 3000; //Initialize constants for server
const express = require("express");//Load express module
const cors = require('cors');
const { getAllCards } = require('/Users/sid/CS386/FINAL/backend/dataBaseInteractions.js');
const app = express();

app.use(cors());
app.get('/getCards', async function (req, res) {
    cardData = await getAllCards()

    res.json(cardData)

})

app.get('/', function (req, res) {
    res.send('HI')
})


app.listen(port, host, function () { //app.listen, get port and server, callback
    console.log(`Express started on ${host}:${port} 
	at ${new Date().toLocaleString()} 
	; press Ctrl-C to terminate.` );
});