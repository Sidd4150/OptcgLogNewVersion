const mongoose = require('mongoose');
//Copy connection string into variable connString, replace <password> with your actual password
//Make sure to also remove the angle brackets (<...>)
require('dotenv').config(); // if you store MONGO_USER and MONGO_PASS in a .env file

// Use environment variables for security
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = encodeURIComponent(process.env.MONGO_PASS);

const connString = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@fullstackwebdev.xjlmih6.mongodb.net/?retryWrites=true&w=majority&appName=fullstackwebdev`;


// Connect to MongoDB
mongoose.connect(connString)
	.then( //Callback functions
		function () { //Success
			let conn = mongoose.connection;
			console.log(`Database is connected: ${conn.host}:${conn.port} @ ${conn.name}`);
			mongoose.connection.close()
				.then( //Callback functions
					function () { //Success
						console.log('MongoDB connection closed');
					}, function (err) { //Error
						console.log("Problem while closing database " + err);
					}
				)
		},
		function (err) { //Error
			console.log("Problem while connecting database " + err);
		}
	)