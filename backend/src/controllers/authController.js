import { asyncHandler } from "../utils/asyncHandler.js";

export const login = asyncHandler(async (req, res) => {
    res.send("login");
    console.log('first')
});
export const register = asyncHandler(async (req, res) => {
    res.send("register");
});
