import express from "express";
import githubRoutes from "./routes/github.routes.js";
import { clerkMiddleware } from "@clerk/express";

const app = express()

app.use(clerkMiddleware)
app.use("/api", githubRoutes);

export default app