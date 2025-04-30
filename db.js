// const { default: mongoose } = require('mongoose');
const mongoose=require('mongoose');

// define mongodb connection url

// const mongoURL='mongodb://localhost:27017/hotels' //replace mydatabase with your database
    const mongoURL='mongodb+srv://hotel:rampravesh.yadav@cluster0.kfg699b.mongodb.net/';

// Setup mongodb connections
mongoose.connect(mongoURL,{
    // useNewUrlParser:true,            |
    // useUnifiedTopology:true          | no need of this in latest version of 
})

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