// creating server using express js

const express = require('express');
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.json()); // req.body
const db = require('./db');


app.get('/', (req, res) => {
  res.send('welcome to my Hotel... how may i help you...? ');
});


//import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes= require('./routes/menuRoutes');

//Use 0f the router
app.use('/person',personRoutes);
app.use('/menuItem',menuRoutes);


app.listen(3030,()=>{
  console.log("listening on port 3030");
});

// comment added for checking purpose