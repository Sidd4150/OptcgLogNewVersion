const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('../../modules/config.js');
const apiRoutes = require('../../routes/routes.js');

const app = express();
const host = config.server.host;
const port = process.env.PORT || 3000
const pathToRoot = path.join(__dirname, '../../');
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(pathToRoot, 'OPTCG-app-dev', 'dist')));

// Routes
app.use('/', apiRoutes);


//serve for unknow routes since im using reactRouter
app.get('*', (req, res) => {
    res.sendFile(path.join(pathToRoot, 'OPTCG-app-dev', 'dist', 'index.html'));
});



// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Express started on render , ${host}:${port} at ${new Date().toLocaleString()}`);
});
