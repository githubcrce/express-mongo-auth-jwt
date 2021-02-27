const express= require('express');
const { copyFileSync } = require('fs');
const app=express();
const path=require('path');
const port=process.env.PORT|| 3000;
require("./db/conn")
const static_path=path.join(__dirname,"../public");
const Register=require("./models/registers");
const bcrypt= require('bcryptjs');


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.get("/",(req,res)=>{
    res.send("Hello");
});

app.get("/register",(req,res)=>{
    res.sendFile(static_path+"/register.html");
})
app.get("/login",(req,res)=>{
    res.sendFile(static_path+"/login.html");
})



app.post("/register",async(req,res)=>{
    try {
        const password=req.body.pass;
        const cpass=req.body.cpass;
        if(password===cpass)
        {

            const registerUser=new Register({
                username:req.body.user,
                email:req.body.email,
                phone:req.body.phone,
                password:password
            })
          const result=await registerUser.save();
            res.status(201).sendFile(static_path+"/index.html");
            console.log(result);
        }
        else
        {
            res.send("Not Matching"); 
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

app.post('/login',async(req,res)=>{
    try {
        const user=req.body.user;
        const pass=req.body.pass;

         const result=await Register.findOne({username:user});

        const ismatch= await bcrypt.compare(pass,result.password);
        if(ismatch)
        {
            console.log("Login Success");
            res.redirect('/');
        }
        else
        {
            console.log("Login Failed");
            res.redirect("/login");
        }
    } catch (error) {
        console.log("No email found..");
        console.log(error);
        
        res.redirect('/login')
    }
})

//Web token

const jwt = require("jsonwebtoken");

const createToken= async()=>{
    jwt.sign({_id:"21321"},"waedsdewfdsawedsadewdasdeedasddedqadqdewead")
};

createToken();





app.listen(port,()=>{
    console.log(`server running at port ${port} `);
});