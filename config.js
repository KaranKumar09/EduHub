
// const mongoose = require('mongoose');
// const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

// // Check database connected or not
// connect.then(() => {
//     console.log("Database Connected Successfully");
// })
// .catch(() => {
//     console.log("Database cannot be Connected");
// })

// // Create Schema
// const Loginschema = new mongoose.Schema({
//     name: {
//         type:String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//       },
//     password: {
//         type: String,
//         required: true
//     },
    
// });


// // collection part
// const collection = new mongoose.model("users", Loginschema);

// module.exports = collection;
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// MongoDB Atlas Connection String (Replace <your-connection-string> with your actual connection string)
const mongoURI = process.env.MONGO_URI || "mongodb+srv://karan9955078:ZVN18RUzLzQt6Tui@cluster0.5upys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connect = mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Check database connection status
connect.then(() => {
    console.log("Connected to MongoDB Atlas Successfully");
})
.catch((error) => {
    console.error("Database Connection Failed:", error);
});

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

// Collection part
const collection = mongoose.model("users", Loginschema);

module.exports = collection;
