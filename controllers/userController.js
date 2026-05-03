const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt=require("jsonwebtoken");

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

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = async (req,res)=>{
    try{
        const {email,password}=req.body;

        //check user
        const user=await User.findOne({email});

        if(user &&(await bcrypt.compare(password,user.password))){
            res.json({
                _id:user._id,
                username:user.username,
                email:user.email,
                token:generateToken(user._id)
            });
        }else{
            res.status(401).json({message:"Invalid email or password"});
        }
    }catch(error){
        res.send(500).json({message:error.message});
    }
};

//JWT Generator
const generateToken = (id) =>{
    return jwt.sign({ id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
};

module.exports = {registerUser,loginUser};
