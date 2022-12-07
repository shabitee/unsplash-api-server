"use strict";



 const express = require("express");
  require("dotenv").config();
 const superagent = require("superagent");
 const loggerMiddleware= require('./middlewares/logger');
 const validateMiddleware = require('./middlewares/validate');
 const PORT = process.env.PORT;
 const AccessKey = process.env.ACCESS_KEY

 const app = express();
 
 app.use(loggerMiddleware);
 app.use(validateMiddleware);




 


 

 app.get("/",(req,res )=>{
    res.status(200).send("Welcome again!");
 });

// This endpoint is going to localhost:3000/searchImage?title=book.
 app.get("/searchImage",(req,res)=>{
   const searchItem=req.query.title
   const url=`https://api.unsplash.com/search/photos?query=${searchItem}&client_id=${AccessKey}`;
   console.log(req.query);
   superagent
   .get(url)
   .then((findings)=>{
      res.status(200).send(findings.body);
   })
   .catch((error)=>{
      res.status(500).send(`Invalid`);
   });

 });

// This endpoint is with a router level middleware(validateMiddleware)
app.get("/searchSecondImage", validateMiddleware,(req,res)=>{
   const searchItem=req.query.title
   const url=`https://api.unsplash.com/search/photos?query=${searchItem}&client_id=${AccessKey}`;
   console.log(req.query);
   // let randomness = req.query.results.profile_image.medium;
   superagent
   .get(url)
   .then((findings)=>{
      const myImageArray = findings.body.map((randomness)=>randomness);
      res.status(200).send(myImageArray);
   })
   .catch((error)=>{
      res.status(500).send(`Invalid`);
   });

 });

 class Photos{
   constructor(randomness){
       this.name = randomness.name;
       this.imageUrl= randomness.profile_image;
       this.description= randomness.description;

   }
}




 app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
});