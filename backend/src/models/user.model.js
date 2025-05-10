import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        userName:{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        fullName:{
            type: String,
            required: true,
            index: true
        },
        email:{
            type: String,
            required: true,
            index: true
        },
        password:{
            type: String,
            required: true
        },
        post:{
            type: String,
            enum: ["worker","manager"],
            required: true
        },
        tableNo:{
            type: Number
        },
        refreshToken:{
            type: String
        },
        status:{
            type: String,
            default:"no",
            enum:["yes","no"]
        },
        diamond:{
            type:Number,
            default:0
        },
        totalDiamond:[{
            type:Number
        }],
        diamondColor:{
            type:String,
            default:"white",
            enum:["danger", "white", "success", "primary"]
        }
    },{timestamps: true}
)

userSchema.pre("save", async function(next){
    if (this.isModified("diamond")) {
        this.totalDiamond += this.diamond;
      }
      next();
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)