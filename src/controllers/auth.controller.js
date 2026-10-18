import { getAuth, clerkClient } from "@clerk/express";
import { userModule } from "../modules/user.module";

export async function registerUser(req, res) {
    // const { isAuthenticated, userId, } = getAuth(req);
    const { installationId } = req.body
    const userId = "user_3K8tr8pm6GRXlMqT0ENsBDqxqol";
    if (!userId) return res.status(401).json({ message: "Unauthorized, userId is messing" });

    const provider = "github"
    const token = await clerkClient.users.getUserOauthAccessToken(userId, provider);
    const userInfo = await clerkClient.users.getUser(userId);

    const userData = {
        installationId,
        email: userInfo.emailAddresses[0].emailAddress,
        clerkId: userId
    }

    const user = userModule.create(userData)

    res.status(200).json({ message: "User register successfully" });
}

export async function getUserData(req, res) {
    const { userId } = getAuth(req);
}