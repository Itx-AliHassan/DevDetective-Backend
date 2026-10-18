import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
 * - github this is an onj with username, profileUrl, isConnected (not required)
 * - reposMonitoring this will tell the user how many repos are on Monitoring (not required)
 * - avatarUrl is the user's profile image URL
 */

export const userModule = mongoose.model("User", userSchema)