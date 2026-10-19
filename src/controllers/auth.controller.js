import { getAuth, clerkClient } from "@clerk/express";
import { userModule } from "../modules/user.module.js";

export async function registerUser(req, res) {
    // const { isAuthenticated, userId, } = getAuth(req);
    const { installationId } = req.body
    const userId = "user_3K8tr8pm6GRXlMqT0ENsBDqxqol";
    if (!userId) return res.status(401).json({ message: "Unauthorized, token is missing" });
    if (!isAuthenticated) return res.status(401).json({ message: "user is Unauthorized" });
    if (!installationId) return res.status(400).json({ message: "installationId is missing" });

    const userInfo = await clerkClient.users.getUser(userId);

    const userData = {
        clerkId: userId,
        installationId,
        email: userInfo.emailAddresses[0].emailAddress,
    }

    const user = userModule.create(userData)

    res.status(200).json({ message: "User register successfully" });
}

export async function getUserData(req, res) {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized, token is missing" });

    const userData = clerkClient.users.getUser(userId)
    res.status(200).json({ message: "User data fetch successfully", userData })
}