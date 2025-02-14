import jwt from "jsonwebtoken";
import { UserModel } from "../module/auth.module.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const checkUser = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.headers.bearer;

  if (!token) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
});
