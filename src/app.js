import express from "express";
import githubRoutes from "./routes/github.routes.js";

const app = express()

app.use("/api", githubRoutes);

export default app