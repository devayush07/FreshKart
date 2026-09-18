import express from "express";
import { getUserCart, updateCart } from "../controllers/cart.controller.js";
import authUser from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.post("/update", authUser, updateCart);
router.get("/:id", authUser, getUserCart);

export default router;
