// creating server using express js

const express = require('express');
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.json()); // req.body
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const PORT = process.env.PORT || 3030;



// Middleware function...
const logRequest = (req, res, next) =>{
  console.log(`[${new Date().toLocaleString()} Request made to: ${req.originalUrl}]`);
  next(); // move on to the next phase
}
app.use(logRequest);



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session : false});

app.get('/',(req, res) => { 
  res.send('welcome to my Hotel... how may i help you...? ');
});




//import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes= require('./routes/menuRoutes');


//Use 0f the router
app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menuItem',menuRoutes);



app.listen(3030,()=>{
  console.log("listening on port 3030");
});

// comment added for checking purpose