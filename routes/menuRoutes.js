const express=require('express');
const router = express.Router();

const menuItem = require('./../models/menuItem');



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
  


  module.exports=router;