const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require('fs');
const { Db } = require("mongodb");
const { type } = require("os");
const { date, boolean, object } = require("zod");
const { error, log } = require("console");


app.use(express.json());
app.use(cors());

// DB Connect
mongoose.connect("mongodb+srv://DB_USERNAME:DB_PASSWORD@cluster0.k3bnzoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// API
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Ensure the upload directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Image Storage Engine
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve images statically
app.use('/images', express.static(uploadDir));

// Creating Uploading Endpoint for images
app.post('/upload', upload.single('product'), (req, res) => {
    if (req.file) {
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
            
        }
    );
    } else {
        res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
});

//Product Creation Schema

const Product = mongoose.model("Product",{

    id:{
        type:Number,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required: true
    },
    old_price:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        default:Date.now

    },
    available:{
        type:Boolean,
        default:true
    }
})



app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({})
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
console.log(product);
try {
    await product.save();
    res.json({
        success: true,
        name:req.body.name
    });
} catch (error) {
    res.status(500).json({ success: false, message:"Something went Wrong "+ error.message });
}
})

// Creating API for deleting the Product

app.post('/removeproduct',async (req,res)=>{
    try {
    await Product.findOneAndDelete({id:req.body.id})
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
} catch (error) {
    res.status(500).json({ success: false, message:"Something went Wrong "+ error.message });
}
})

// Cretaing API for getting all Products 

app.get('/allproduct',async (req,res)=>{
    try {
    let products = await Product.find({})
    console.log("All Produts fetched");
    res.send(products)
} catch (error) {
    res.status(500).json({ success: false, message:"Something went Wrong "+ error.message });
}
})


// Schema For Usrs

const Users = mongoose.model('Users',{
    name:{
        type:String,
        
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        date:Date.now,
    }
})

// Creating API for User resgistration

app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email})

    if(check){
       return res.status(400).json({success:false,error:"User Exist"})
    }
    let cart = {};
    for (let i = 0; i < 1000; i++) {
        cart[i]=0;
        
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })

    // JWT authentication
    await user.save();

     const data = {
        user:{
            id:user.id
        }
     }
     const token = jwt.sign(data,'ecom_secret_salt');
     res.json({success:true,token})
})


// Creating API for User Login

app.post('/login', async (req,res)=>{

    let user = await Users.findOne({email:req.body.email})
    if(user){
        const passcheck = req.body.password===user.password;
        if(passcheck){
            const data = {
                user:{
                     id:user.id
                }
            }

            const token = jwt.sign(data,'ecom_secret_salt')
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"wrong password! Try Again"})
        }

    }
    else{
        res.json({success:false,errors:"User did not exist"})
    }

})


// Creating Endpoint for new Collections

app.get('/newcollection', async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection)
})

// Creating Endpoint for popular in women section 

app.get('/popularinwomen',async (req,res)=>{
let products = await Product.find({category:"women"});
let popular_in_women= products.slice(0,4);
console.log("popular in women fetched");
res.send(popular_in_women);
}) 

// Creating Middleware for fetching Users

const fetchUser = async(req,res,next)=>{
const token = req.header('auth-token')
if(!token){
    res.status(401).send({errors:"Please authenticate using valid token "})
}
else{
    try {
        const data = jwt.verify(token,'ecom_secret_salt')
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({errors:"Please authenticate using valid token "})
    }
}
}

//Creating Endpoint for add product in Cart

app.post('/addtocart',fetchUser, async (req,res)=>{
    console.log("Added", req.body. itemId);
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added")

})

//Creating Endpoint for removing product from Cart

app.post('/removefromcart',fetchUser, async (req,res)=>{
    console.log("Removed", req.body. itemId);
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed")

})

// Creating Endpoint for getting Cart Data

app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("Get Cart")
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
})

app.listen(port, (err) => {
    if (!err) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + err);
    }
});
