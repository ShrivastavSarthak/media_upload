import { Router } from "express";
import { checkUser } from "../middleware/checkUser.js";
import {
  deleteMedia,
  getMediaById,
  postMedia,
  updateMedia,
} from "../controller/media.controller.js";
import { getAllMedia } from "../controller/user.controller.js";
import upload from "../middleware/fileUpload.js";

const router = Router();

router.route("/post").post(checkUser, upload.single("file"), postMedia);
router.route("/:id").patch(checkUser, upload.single("file"), updateMedia);
router.route("/:id").delete(checkUser, deleteMedia);
router.route("/:id").get(checkUser, getMediaById);
router.route("/user/:id").get(checkUser, getAllMedia);

export default router;
