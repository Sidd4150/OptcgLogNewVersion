const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('../../modules/config.js');
const apiRoutes = require('../../routes/routes.js');

const app = express();
const host = config.server.host;
const port = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../../OPTCG-app-dev/dist')));

// Routes
app.use('/', apiRoutes);


//serve for unknow routes since im using reactRouter
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../OPTCG-app-dev/dist', 'index.html'));
});



// Start server
app.listen(port, host, () => {
    console.log(`Express started on http://localhost:3000/ , ${host}:${port} at ${new Date().toLocaleString()}`);
});
