const express=require('express');
const router= express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt');
const { json } = require('body-parser');



// create operation ... using post method
router.post('/signup',async(req,res)=>{

    try{
    const data=req.body   // assuming the request body contains the person data
  
    // creating a new person document using mongoose  model
   const newPerson= new Person(data);
    // newPerson.name = data.name;  // we should use Person(data) in the above bcz manual type is too time consuming 
  
    //save the newPerson to the database
    const response = await newPerson.save();
    console.log('data saved:');

      const payload ={
        id: response.id,
        username: response.username
      } 

    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("The token is: ",token);

    res.status(200).json({response: response, token: token});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
  });

  //login Route 
  router.post('/login', async(req,res)=>{
    try{
      // Extract username and spassowrd from request body
      const {username ,password} = req.body;
      
      //Find the user by username 
      const user = await Person.findOne({username:  username});

      // If user does not exist or password does not match , return error
      if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error:'Invalid username or password'});
      }


      //Generate token 
      const payload={
        id: user.id,
        username: user.username
      }
      const token = generateToken(payload);
      res.json({token});

    }catch(err){
      console.error(err);
      res.status(500).json({error:'Internal Server error'});
    }
  });
  

   // Profile Route
      router.get('/profile', jwtAuthMiddleware, async(req, res)=>{
       try{

       const userData = req.user;
       console.log("User data: ", userData);

       const userId = userData.id;
       const user = await Person.findById(userId);

       res.status(200).json({user});
       }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
      });

  //read operation... using get method
  router.get('/',jwtAuthMiddleware,async(req , res)=>{
    try{
      const data= await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  
    }
  });

  
// parameterized call ...
router.get('/:workType',async(req, res)=>{
    try{
    const workType = req.params.workType;     // Extract the work type of the URL parameter 
    if(workType=='chef' || workType=='waiter' || workType=='manager' ){
      const response = await Person.find({work: workType});
      console.log('data fetched successfully...');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error: 'Invalid work type'});
    }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error...'});
    }
  
  });

// update operation... using put method
router.put('/:id', async(req, res)=>{
  try{
  const personId=req.params.id;       // Extract the id from the URL parameter
  const updatedPersonData = req.body;  // Update the data for the person
  
  const response= await Person.findByIdAndUpdate(personId,updatedPersonData, {
      new: true,      // Return the updated document 
      runValidators: true  //Run mongoose validation
  })
  if(!response){
      return res.status(404).json({error: 'Person Not Found.'});
  }
  console.log('data updated');
  res.status(200).json(response);
} 
catch(err){
  console.log(err);
  res.status(500).json({error:'Internal Server Error...'});
}
});


// Delete operation using.... delete method
router.delete('/:id',async(req, res)=>{
  try{
    const personId= req.params.id;  // Extract the id from the URL parameter
    const response= await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error: 'Person Not Found.'});
  }
  console.log('data deleted successfully...');
  res.status(200).json(response);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error...'});
  }
});


  module.exports=router;


  
  