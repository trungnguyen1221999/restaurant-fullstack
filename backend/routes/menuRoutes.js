import express from "express";
import {
  getMenuItems,
  createMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();


router.get("/", getMenuItems);

router.post("/",  createMenuItem);

router.delete("/:id",  deleteMenuItem);



export default router;
