import Joi from "joi";
import UserModel from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";

const passwordRule = Joi.string()
  .min(8)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
  .message(
    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
  )
  .required();

const email = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
  .required()
  .messages({
    "string.email": "Enter a valid email address",
  });

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email,
  password: passwordRule,
  role: Joi.string().valid("user", "admin").default("user"),
});

export const loginSchema = Joi.object({
  email,
  password: Joi.string().required(),
  rememberMe: Joi.boolean().default(false),
});
