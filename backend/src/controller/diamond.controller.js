import {asyncHandler, ApiError, ApiResponse} from "../utils/index.js"
import { User } from "../models/user.model.js"

const addDiamond = asyncHandler(async (req,res) => {
    const{userName, diamond, diamondColor} = req.body

    const findUser = await User.findOne({
        $or:[{userName}]
    })

    if (!findUser) {
        throw new ApiError(404, "User is not found")
    }

    findUser.diamond = diamond
    findUser.diamondColor = diamondColor
    await findUser.save()

    const updatedUser = await User.findById(findUser._id).select("-password -refreshToken")

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Status updated successfully")
    )
})

const deleteDiamond = asyncHandler(async (req, res) => {
    const { userName } = req.body;
  
    const findUser = await User.findOne({
      $or: [{ userName }],
    });
  
    if (!findUser) {
      throw new ApiError(404, "User is not found");
    }

    findUser.diamond = 0;
    findUser.diamondColor = "white"
    await findUser.save();
  
    const updatedUser = await User.findById(findUser._id).select("-password -refreshToken");
  
    return res.status(200).json(
      new ApiResponse(200, updatedUser, "Diamond cleared successfully")
    );
  });

export {addDiamond, deleteDiamond}