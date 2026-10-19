import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    installationId: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true })

/**
 * This will create an user on mongoDB thing to foreword to create an user
 * - clerkId you will get this from the clerk this is the second storage you get every data from there
 * - installationId this is the installation_id which you get when the user install the GH app
 * - email don't tell me you don't know this
 */

export const userModule = mongoose.model("User", userSchema)