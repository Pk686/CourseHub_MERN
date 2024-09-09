const mongoose = require("mongoose");
// const URI = "mongodb://127.0.0.1:27017/mern_admin";
const URI = process.env.MONGODB_URI;

const dbConnect = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database Connected Successfully !!");
    }
    catch (error) {
        console.error("db connection failed !!");
        process.exit(0);
    }
};

module.exports = dbConnect;