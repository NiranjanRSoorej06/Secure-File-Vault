const bcrypt = require("bcrypt");
const User = require("../models/User");

//@desc Register new user
//@route POST /api/users/register
//@access Public
const  registerUser = async (req,res)=>{
    try{
        const {username,email,password}=req.body;

        //check if user already exists
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({message:"User already exists"});
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //create user
        const user=await User.create({
            username,
            email,
            password:hashedPassword
        });

        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports = {registerUser};
