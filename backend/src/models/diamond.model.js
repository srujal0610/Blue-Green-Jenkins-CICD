import mongoose, {Schema} from "mongoose";

const diamondSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        diamondWeaight:{
            type: String,
            required: true,
            lowercase: true 
        },
        diamondColor:{
            type: String,
            required: true,
            lowercase: true
        },
        diamondPacketId:{
            type: String,
            required: true,
            lowercase: true,
            index: true
        }
    },{timestamps: true}
)