import { FoodItem } from "../models/foodItem.model.js";
import { ApiError } from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import fs from "fs";


const newFoodItem = asyncHandler(async (req, res) => {
    // img
    const { name, number, price } = req.body;

    console.log(req.body)
    console.log("1",req.files)
    console.log("2",req.file)

    if (!name || !number || !price) {
        throw new ApiError(400, "all fields are required")
    }


    if (!req.file?.path) {
        throw new ApiError(401, "product image path is not defined")
    }

    const imgPath = req.file.path.replace("public","").replaceAll("\\","/")



    const newFoodItem = await FoodItem.create({
        name, price, imageUrl: imgPath,
        number
    })


    const checkedItem = await FoodItem.findById(newFoodItem._id)

    if (!checkedItem) {
        throw new ApiError(500, "server error: faild to create the food item")
    }

    // await cacheInvalidate({product:true})

    return res.status(201).json(new ApiResponse(201, checkedItem, req.body, "foodItem created successfully"))
})
const updateFoodItem = asyncHandler(async (req, res) => {
    // img
    const { id, name, number, price, imageUrl } = req.body;

    if (!name || !number || !price) {
        throw new ApiError(400, "all fields are required")
    }


    if (!req.file?.path) {
        const newFoodItem = await FoodItem.findByIdAndUpdate(
            id,
            {
                $set: {
                    name, price,
                    number
                }
            }, { new: true }
        )

        const checkedItem = await FoodItem.findById(newFoodItem._id)

        if (!checkedItem) {
            throw new ApiError(500, "server error: faild to create Product")
        }
        // 

        // await cacheInvalidate({product:true})
        return res.status(201).json(new ApiResponse(201, checkedItem, "item updated successfully"))
    }


    // delete old image**
    await fs.unlinkSync(imageUrl)
    const newFoodItem = await FoodItem.findByIdAndUpdate(
        id,
        {
            $set: {
                name, price,
                number, imageUrl: req.file.path
            }
        }, { new: true }
    )


    const checkedItem = await FoodItem.findById(newFoodItem._id)

    if (!checkedItem) {
        throw new ApiError(500, "server error: faild to create the food item")
    }

    // await cacheInvalidate({product:true})

    return res.status(201).json(new ApiResponse(201, checkedItem, "foodItem updated successfully"))
})

const deleteItem = asyncHandler(async (req, res) => {
    const { id, imageUrl } = req.body;
    // console.log(id)
    // console.log(imageUrl)
    if (!id || !imageUrl) {
        throw new ApiError(401, "id not found")
    }


    const deleteItem = await FoodItem.findByIdAndDelete(id)
    // console.log(deleteItem)
    if (!deleteItem) {
        throw new ApiError(501, "can't delete the item, error")
    }

    fs.unlinkSync(imageUrl)

    // await cacheInvalidate({product:true})
    return res.status(200).json(new ApiResponse(201, "item deleted successfully"))

})
const getFoodItem = asyncHandler(async (req, res) => {
    const { number } = req.query;


    if (!number) {
        const items = await FoodItem.find({})

        if (!items) {
            throw new ApiError(501, "can't find the item, error")
        }

        return res.status(200).json(new ApiResponse(201,items, "item fetched successfully"))
    }


    console.log('first')
    const items = await FoodItem.find({
        number
    })

    if (!items) {
        throw new ApiError(501, "can't find the item, error")
    }

    // await cacheInvalidate({product:true})
    return res.status(200).json(new ApiResponse(201,items, "item fetched successfully"))

})



export { newFoodItem, updateFoodItem, deleteItem,getFoodItem }