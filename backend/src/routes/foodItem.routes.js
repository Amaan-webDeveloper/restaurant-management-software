import { Router } from "express";
import { deleteItem, getFoodItem, newFoodItem, updateFoodItem } from "../controllers/foodItems.controller.js";
import { upload } from "../middleware/multer.middileware.js";

const router = Router();

router.route("/create-new-fooditem").post(upload.single("foodItemImage"),newFoodItem)

router.route("/update-fooditem").post(upload.single("foodItemImage"),updateFoodItem)

router.route("/delete-fooditem").post(deleteItem)

router.route("/get-fooditem").post(getFoodItem)
export default router