import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            require: [true, "Password is required"],
        },
        refreshToken: {
            type: String
        },
        accessToken: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }

    }, {
    timestamps: true
}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.userName,
            fullname: this.fullName,
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            // expiresIn: new Date(Date.now() + 6000 * 1000)
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        }, process.env.REFRESH_TOKEN_SECRET,
        {
            // expiresIn: process.env.REFRESH_TOKEN_EXPIRY/
            // expiresIn: new Date(Date.now() + 6000 * 1000)
        }
    )
}


export const User = mongoose.model("User", userSchema)