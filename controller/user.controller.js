import { UserModel } from "../module/auth.module.js";
import { MediaModel } from "../module/media.module.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const userSignup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  let user = await UserModel.findOne({ email: email });
  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await UserModel({
    fullName,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const token = createToken(newUser._id);

  if (!token) {
    return res.status(400).json({
      message: "Something went wrong",
    });
  }

  res.status(201).json({
    message: "User created successfully",
    token,
    id: newUser._id,
  });
});

export const userSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = createToken(user._id);

  if (!token) {
    return res.status(400).json({
      message: "Something went wrong",
    });
  }

  res.status(200).json({
    message: "User signed in successfully",
    token,
    id: user._id,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "User ID is required",
    });
  }

  const user = await UserModel.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const getAllMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "User ID is required",
    });
  }

  const media = await MediaModel.find({ userId: id })
    .sort({ createdAt: -1 })
    .populate("userId", "-password");

  if (!media.length) {
    return res.status(404).json({
      message: "No media found for this user",
    });
  }

  res.status(200).json({
    count: media.length,
    media,
  });
});
