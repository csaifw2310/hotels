const express=require('express');
const router = express.Router();

const menuItem = require('./../models/menuItem');


//Create operation using post method
router.post('/',async(req,res)=>{
    try{
      const data=req.body
      const newmenu=new menuItem(data);
      const menudata= await newmenu.save();
      console.log('data saved successfully...');
      res.status(200).json(menudata);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error...'});
    }
  });
  
  //Read operation using get method 
  router.get('/',async(req,res)=>{
    try{
      const menudata= await menuItem.find();
      console.log('data fetched successfully...');
      res.status(200).json(menudata);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error...'});
    }
  });
  
// Read operation using get method and also using parameter 
  router.get('/:taste',async(req,res)=>{
    try{
      const taste = req.params.taste;
      if(taste=='sweet'|| taste=='sour'|| taste=='spicy'){
        const response = await menuItem.find({taste: taste});
        console.log('data fetched successfully...');
        res.status(200).json(response);
      }
      else{
        res.status(404).json({error: ' Item Invalid'});
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error...'});
    }
  });
  

  // Update operation using PUT/PATCH method 
  router.put('/:id',async(req,res)=>{
    try{
      const menuid=req.params.id;
      const updatedMenuData= req.body;
      const response = await menuItem.findByIdAndUpdate(menuid,updatedMenuData, {
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
      res.status(500).json({error: 'Internal server Error'});
    }
  });

  
// Delete operation using.... delete method
router.delete('/:id',async(req, res)=>{
  try{
    const menuid= req.params.id;  // Extract the id from the URL parameter
    const response= await menuItem.findByIdAndDelete(menuid);
    if(!response){
      return res.status(404).json({error: 'Item Not Found.'});
  }
  console.log('Item  deleted successfully...');
  res.status(200).json(response);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error...'});
  }
});



  module.exports=router;