import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import NodeCache from "node-cache";

export const cache = new NodeCache()
const app = express()

// app.use(cors())
app.use(
    cors(
        {
            origin: process.env.CORS_ORIGIN,
            credentials: true
        }
    )
)

app.use(express.json({}))//limit:"20kb"
app.use(express.urlencoded({ extended: true }))//,limit:"20kb"
app.use(express.static("public"))
app.use(cookieParser())


// importing routes 
import authRouter from "./routes/auth.routes.js"
import foodItem from "./routes/foodItem.routes.js";
// import productRouter from "./src/routes/product.routes.js"
// import orderRouter from "./src/routes/order.routes.js"


// routes declaration
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/fooditem", foodItem)
// app.use("/api/v1/product",productRouter)
// app.use("/api/v1/order",orderRouter)


export { app }