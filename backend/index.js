const port = 4000;
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")

app.use(express.json());
app.use(cors());


// DB Connect

mongoose.connect("mongodb+srv://username:password@cluster0.k3bnzoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

// API

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})


//Image Storage Engine

const Storage = multer.diskStorage({
    destination:'./upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}`)

        
    }
})

app.listen(port,(err)=>{
    if(!err){
        console.log("Server Running on Port "+port);
    }
    else{
        console.log("Error: "+err);
    }
})