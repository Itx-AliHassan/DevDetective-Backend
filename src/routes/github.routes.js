import express from "express";
import { connectGitHub, getRepo, getReposName } from "../controller/github.controller.js";

const router = express.Router();

router.get("/connect-github", connectGitHub);
router.get("/get-repo/:id", getRepo)
router.get("/get-repos", getReposName)

export default router