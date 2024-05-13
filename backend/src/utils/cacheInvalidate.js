
import { cache } from "../../app.js";
import { FoodItem } from "../models/foodItem.model.js"

export const cacheInvalidate = async ({ foodItem, orders, admin, }) => {
    if (foodItem) {
        const productKeys = ["adminAllProducts", "categories"]

        const productsId = await Product.find({}).select("_id")

        productsId.forEach(element => {
            productKeys.push(`product-${element._id}`)
        });

        cache.del(productKeys)
    }
}