import { Router } from "express";
import {
  getUserById,
  userSignin,
  userSignup,
} from "../controller/user.controller.js";
import { checkUser } from "../middleware/checkUser.js";

const router = Router();

router.route("/signup").post(userSignup);
router.route("/signin").post(userSignin);
router.route("/user/:id").get(checkUser, getUserById);

export default router;
