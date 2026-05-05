const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB=require("./config/db");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const path=require("path");

dotenv.config();

//connect database
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/files",fileRoutes);
//serve uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads")));


//test route
app.get("/",(req,res)=>{
    res.send("API runninig");
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});
