import express from "express";
import { saveToken, getRepos } from "../controllers/github.controller.js";

const router = express.Router();

router.post("/callback", saveToken)
router.get("/get-repos", getRepos)


export default router;