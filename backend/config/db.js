require("dotenv").config();
const mongoose = require("mongoose");
const server = "127.0.0.1:27017";
const database = "ecom-web";
const connectDB =async() => {
    try {
         mongoose.set("strictQuery", false);
         await mongoose.connect(`mongodb://${server}/${database}`);
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error("MongoDB connection FAIL");
        process.exit(1);
    } 
} 
module.exports = connectDB; 
