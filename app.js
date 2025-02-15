import cors from "cors";
import express from "express";
import authRoutes from "./router/auth.routes.js";
import mediaRoutes from "./router/media.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/media", mediaRoutes);
