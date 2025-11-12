require('dotenv').config({ path: __dirname + '/../.env' });
const connectDB = require('../modules/db.js');

(async () => {
    try {
        // Try to open a connection
        await connectDB(true);
        console.log('✅ Database connected successfully.');

        // If successful, close it cleanly
        await connectDB(false);
        console.log('🔒 Database connection closed.');

        // Exit with success code
        process.exit(0);
    } catch (err) {
        console.error('❌ Database connection test failed:', err);
        // Exit with failure code
        process.exit(1);
    }
})();
