const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');
const userSchema = new mongoose.Schema({
    username:
    {
        type:String,
        required:true,
        unique:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    phone:
    {
        type:Number,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    }
});
//MiddleWare this->just before saving password value
userSchema.pre("save",async function(next){
    // const passhash=await bcrypt.hash(password,10);
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password,10);
    }
    
    next();
})


const Register = new mongoose.model("Userinfo",userSchema);

module.exports=Register;