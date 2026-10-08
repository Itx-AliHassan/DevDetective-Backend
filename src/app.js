import express from "express";
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./routes/auth.routes.js";
import githubRoutes from "./routes/github.routes.js";

const app = express()

app.use(express.json)

app.use('/api/auth', authRoutes)
app.use('/api/github', githubRoutes)

export default app