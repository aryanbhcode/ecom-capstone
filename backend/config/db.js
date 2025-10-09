const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL, {
        });
        console.log("Connected");
    }

    catch (error) {
        console.log("Error: ", error.message);

    }
};

module.exports = connect;