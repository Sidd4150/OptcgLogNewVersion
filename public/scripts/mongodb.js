const mongoose = require('mongoose');
//Copy connection string into variable connString, replace <password> with your actual password
//Make sure to also remove the angle brackets (<...>)
//Michael's connection string as a sample, yours will look different
const connString = 'mongodb+srv://Sidushakya:SiddFullStack-@fullstackwebdev.xjlmih6.mongodb.net/?retryWrites=true&w=majority&appName=fullstackwebdev';
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