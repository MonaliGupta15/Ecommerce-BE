const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required:true
        },
        quantity: {
            type: Number,
            required: true,
            default:1
        },
        image:{
            type:String,
            required:true
        },
        category: {
            type: String,
            required: true,
            enum: ["electronics", "grocery","fashion"]
        }


    },
    {
        timestamps: true
    }
)

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema)
