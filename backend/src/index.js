import 'dotenv/config'
import { app } from "./app.js";
import mongoose from "mongoose"


;(async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URI}`)

        app.on("error",(error)=>{
            console.log(error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listing on port ${process.env.PORT}`)
        })
        
    } catch (error) {
        console.log(error)
    }
})()