import mongoose, { Schema } from "mongoose";

const foodItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        price: {
            type: Number,
            default: 0,
        },
        number: {
            type: Number,
            require: true,
            unique: true,
        },
        imageUrl:{
            type:String,
            require:true,
            unique:true,
        },
        isAvailable:{
            type:Boolean,
            default:true
        },
        toppings:{
            type:[
                {
                    toppingsName:{
                        type:String,
                        required:true
                    },
                    toppingsPrice:{
                        type:Number,
                        required:true
                    }
                }
            ],
            default:null
        }

    }
)

export const FoodItem = mongoose.model("FoodItem", foodItemSchema)

