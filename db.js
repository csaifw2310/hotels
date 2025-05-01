// const { default: mongoose } = require('mongoose');
const mongoose=require('mongoose');
require('dotenv').config();

// define mongodb connection url

// const mongoURL= process.env.local_db_url; //replace mydatabase with your database
    const mongoURL=process.env.db_URL;

// Setup mongodb connections
mongoose.connect(mongoURL);
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, tlsInsecure: false });


//get the default connection 
// mongoose maintains the default connection object representing the MongoDB connection.

const db=mongoose.connection;


//define event listener for database connection.    

db.on('connected',()=>{
    console.log("connected to MongoDB server...");
});

db.on('error', (err)=>{
    console.error('MongoDB connection error..',err);
});

db.on('disconnected',()=>{
    console.log("MongoDB server disconnected");
});


// Export the database connection 

module.exports=db;