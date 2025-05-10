import {asyncHandler, ApiError, ApiResponse} from "../utils/index.js"
import { User } from "../models/user.model.js"

const getAllData = asyncHandler(async(req, res) => {
    const allData = await User.find({}).select("-password -refreshToken -_id -__v")
    if(!allData){
        throw new ApiError(500, "not get alldata")
    }

    res.status(200).json({allData})
})

export {getAllData}