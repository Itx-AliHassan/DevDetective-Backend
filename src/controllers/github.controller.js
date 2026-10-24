import { getAuth } from "@clerk/express";
import { userModule } from "../modules/user.module.js";

export async function saveToken(req, res) {
    // const { userId } = getAuth(req)
    const userId = 'user_3K8tr8pm6GRXlMqT0ENsBDqxqol'
    const user = await userModule.findOne({ clerkId: userId })
    
    res.status(200).json({ message: "user fetch successfully", user })
}