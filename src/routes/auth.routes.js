import { getAuth } from "@clerk/express";
import express from "express";

const router = express.Router();

router.get('/clerk-data', (req, res) => {
    const auth = getAuth(req);
    console.log('auth', auth)
    return res.status(200).json({ message: "Clerk data retrieved successfully", auth });
})

export default router