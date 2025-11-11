import express from "express";
import {
  getMenuItems,
  createMenuItem,
  deleteMenuItem,
  getMenuItem,
  updateMenuItem,
} from "../controllers/menuController.js";
import upload from "./../helpers/multer.js";

const router = express.Router();

router.get("/", getMenuItems);

router.get("/:id", getMenuItem);

router.post("/", upload.array("images", 5), createMenuItem);

router.delete("/:id", deleteMenuItem);

router.put("/:id", upload.array("images", 5), updateMenuItem);

export default router;
