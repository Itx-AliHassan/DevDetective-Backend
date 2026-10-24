import { getAuth } from "@clerk/express";
import { userModule } from "../modules/user.module.js";

export async function saveToken(req, res) {
    const { userId } = getAuth(req)
    const { installationId } = req.body
    // const userId = 'user_3K8tr8pm6GRXlMqT0ENsBDqxqol'

    if (!installationId) return res.status(422).json({ message: "Installation Id is missing" })
    if (!userId) return res.status(400).json({ message: "UserId is messing pls pass the token to processed" })

    const user = await userModule.findOne({ clerkId: userId })

    user.installationId = installationId

    res.status(200).json({ message: "installationId saved successfully" })
}