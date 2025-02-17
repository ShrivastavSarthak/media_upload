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

  // Get full file path
  const filePath = path.join(process.cwd(), media.fileUrl);

  // Delete file from uploads folder
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      // Continue even if file deletion fails
    }
  });

  next();
});

export default deleteFile;
