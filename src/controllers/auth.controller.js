import { getAuth } from "@clerk/express";

export async function registerUser(req, res) {
    const { id } = req.body

    const auth = getAuth(id)    
    console.log(auth)
    return res.status(201).json({ message: "User Register successfully", auth })
}
