import { MediaModel } from "../module/media.module.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const postMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  const { originalname, mimetype, size, path } = req.file;
  const fileType = mimetype.startsWith("image/") ? "image" : "video";

  const media = await MediaModel.create({
    fileName: originalname,
    fileType: fileType,
    fileSize: size,
    fileUrl: path,
    userId: req.user._id,
  });

  if (!media) {
    return res.status(400).json({
      message: "Media not created",
    });
  }

  res.status(201).json({
    message: "Media created successfully",
    media,
  });
});

export const updateMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { fileName } = req.body;

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  const existingMedia = await MediaModel.findById(id);

  if (!existingMedia) {
    return res.status(404).json({
      message: "Media not found",
    });
  }

  if (existingMedia.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Not authorized to update this media",
    });
  }

  const { originalname, mimetype, size, path } = req.file;
  const fileType = mimetype.startsWith("image/") ? "image" : "video";

  const media = await MediaModel.findByIdAndUpdate(
    id,
    {
      fileName: fileName || originalname,
      fileType: fileType,
      fileSize: size,
      fileUrl: path,
    },
    { new: true }
  );

  res.status(200).json({
    message: "Media updated successfully",
    media,
  });
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const media = await MediaModel.findByIdAndDelete(id);

  if (!media) {
    return res.status(400).json({
      message: "Media not deleted",
    });
  }

  res.status(200).json({
    message: "Media deleted successfully",
    media,
  });
});

export const getMediaById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Media ID is required",
    });
  }

  const media = await MediaModel.findById(id).populate("userId", "-password");

  if (!media) {
    return res.status(404).json({
      message: "Media not found",
    });
  }

  res.status(200).json({
    media,
  });
});
