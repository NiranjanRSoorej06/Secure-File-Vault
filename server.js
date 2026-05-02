const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB=require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

//connect database
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/users",userRoutes);

//test route
app.get("/",(req,res)=>{
    app.send("API runninig");
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});
