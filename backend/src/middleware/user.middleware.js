import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken";

export const verifyJwt = async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("bearer ","")


        if (!token) {
            // throw new ApiError(401,"no token found")
            req.user = false;
            next()
            return null
        }

        const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const userExists = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!userExists) {
            throw new ApiError(403,"invalid token")
        }
        req.user = userExists
        
        next()
    } catch (error) {
        // console.log(error)
        throw new ApiError(401,error)
    }
}