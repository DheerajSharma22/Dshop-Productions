const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected with db successfully...");
    } catch (error) {
        console.log("DB connection failed.");
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectToDB;