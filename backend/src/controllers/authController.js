import UserModel from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { clearToken, generateToken } from "../utils/token.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict("Email is already registered");
  }

  const user = await UserModel.create({ name, email, password });

  generateToken(res, user, {
    statusCode: 201,
    message: "Register successfully",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) throw new ApiError(400, "Email or password is incorrect");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(400, "Email or password is incorrect");

  generateToken(res, user, {
    statusCode: 200,
    message: "Login successfully",
  });
});

export const logout = asyncHandler(async (req, res) => {
  clearToken(res, { message: "Logout successfully" });
});

export const loginWithGoogle = asyncHandler(async () => {
  return sendSuccess(res, { statusCode: 200, message: "Login successfully" });
});
