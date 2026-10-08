import express from "express";
import { installGithubApp } from "../controllers/github.controller.js";

const router = express.Router();

router.get("/install", installGithubApp)

export default router;