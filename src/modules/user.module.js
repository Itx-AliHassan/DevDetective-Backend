import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    clerkId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

/**
 * This will create an user on mongoDB thing to foreword to create an user
 * - installationId this is the installation_id which you get when the user install the GH app
 * - email don't tell me you don't know this
 * - clerkId you will get this from the clerk this is the second storage you get every data from there
 */

export const userModule = mongoose.model("User", userSchema)