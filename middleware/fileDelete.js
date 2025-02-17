import fs from "fs";
import path from "path";
import { asyncHandler } from "../utils/asyncHandler.js";
import { MediaModel } from "../module/media.module.js";

const deleteFile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const media = await MediaModel.findById(id);

  if (!media) {
    return next();
  }

  const filePath = path.join(process.cwd(), media.fileUrl);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    }
  });

  next();
});

export default deleteFile;
