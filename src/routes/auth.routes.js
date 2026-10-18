import express from "express";
import { registerUser, getUserData } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser)
router.get("/user-data", getUserData)

export default router