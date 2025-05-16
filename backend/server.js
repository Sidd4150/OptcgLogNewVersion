const host = '127.0.0.1', port = 3000; //Initialize constants for server
const express = require("express");//Load express module
const cors = require('cors');
const path = require('path');
const { getAllCards } = require(__dirname + '/dataBaseInteractions.js');
const app = express();

app.use(express.static(path.join(__dirname, '../OPTCG-app/dist')));
app.use(cors());
app.get('/getCards', async function (req, res) {
    const cardData = await getAllCards()

    res.json(cardData)

})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../OPTCG-app/dist', 'index.html'));
});




app.listen(port, host, function () { //app.listen, get port and server, callback
    console.log(`Express started on ${host}:${port} 
	at ${new Date().toLocaleString()} 
	; press Ctrl-C to terminate.` );
});