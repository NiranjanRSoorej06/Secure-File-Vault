const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        filename:{
            type: String,
            required: true
        },
        originalName:{
            type: String,
            required:true
        },
        fileSize:{
            type:Number
        }
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model("File",fileSchema);