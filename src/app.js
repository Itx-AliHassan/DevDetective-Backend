import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import githubRoutes from "./routes/github.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express()

// Register CORS before routes so successful API responses and preflight
// requests both include the headers the browser needs.
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean),
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}))

app.use(express.json())
app.use(clerkMiddleware())

app.use('/api/auth', authRoutes)
app.use('/api/github', githubRoutes)

export default app
