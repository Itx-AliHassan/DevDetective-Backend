import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    github: {
        username: {
            type: String,
        },
        profileUrl: {
            type: String
        },
        isConnected: {
            type: Boolean,
            default: false
        }
    },
    reposMonitoring: {
        type: Number,
        default: 0,
        min: 0,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true,
    }
}, { timestamps: true })

/**
 * This will create an user on mongoDB thing to foreword to create an user
 * - clerkId you can get this from the clerk or you can send this from the frontEnd (required)
 * - github this is an onj with username, profileUrl, isConnected (not required)
 * - reposMonitoring this will tell the user how many repos are on Monitoring (not required)
 * - avatarUrl you can get that from the clerk 
 */

export const userModule = mongoose.model("User", userSchema)