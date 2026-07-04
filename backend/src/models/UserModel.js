import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    // phone: { type: String, default: "" },
    avatar: { type: String, default: "" },
    rememberMe: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.index({ name: "text", email: "text" });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpires,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiresDays,
  });
};

userSchema.statics.decodeAccessToken = function (accessToken) {
  return jwt.verify(accessToken, env.jwt.accessSecret);
};

userSchema.statics.decodeRefreshToken = function (refreshToken) {
  return jwt.verify(refreshToken, env.jwt.refreshSecret);
};

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    delete ret._id;
    return ret;
  },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
