import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const profile = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    statusCode: 200,
    message: "User profile fetched successfully",
    data: req.user,
  });
});
