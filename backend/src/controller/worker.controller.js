import {asyncHandler, ApiError, ApiResponse} from "../utils/index.js"
import { User } from "../models/user.model.js"

const workerController = asyncHandler(async(req, res) => {
    const {userName, status} = req.body

    const findUser = await User.findOne({
        $or:[{userName}]
    })

    if (!findUser) {
        throw new ApiError(404, "User is not found")
    }

    findUser.status = status.toLowerCase(); 
    await findUser.save()

    const updatedUser = await User.findById(findUser._id).select("-password -refreshToken")

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Status updated successfully")
    )
})

const getWorkerData = asyncHandler(async(req, res) => {
    const {userName} = req.body

    const findUser = await User.findOne({
        $or:[{userName}]
    })

    if (!findUser) {
        throw new ApiError(404, "User is not found")
    }

    const user = await User.findById(findUser._id).select("-password -refreshToken")

    return res.status(200).json(
        new ApiResponse(200, user, "User find Successfully")
    )
})

export {workerController, getWorkerData}