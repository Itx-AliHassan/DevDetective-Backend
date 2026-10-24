import express from "express";
import { saveToken } from "../controllers/github.controller.js";

const router = express.Router();

router.post("/callback", saveToken)
router.get("")


export default router;