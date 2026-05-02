const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB=require("./config/db");

dotenv.config();

//connect database
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//test route
app.get("/",(req,res)=>{
    app.send("API runninig");
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});
