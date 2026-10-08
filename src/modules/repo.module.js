import mongoose from "mongoose";

const repoSchema = new mongoose.Schema({
    githubRepoId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    repoUrl: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
})

/**
 * This will create an Repo on mongoDB which the AI will Monitor thing to foreword to create an Repo (every thing is required)
 * - "githubRepoId" you will get this from the github API in return
 * - "fullname" this will be the fullname like (OWNER_USERNAME/REPO_NAME)
 * - "name" this will be the name of the repo like (REPO_NAME)
 * - "repoUrl" this will be the URL of the repo like (https://github.com/Itx-AliHassan/DevDetective-Backend)
 * - "owner" this will be the name of the owner of the repo like (Itx-AliHassan)
 * - "language" this will tell you which programming language is user
 * - "userId" this is the id of the user which clerk give you 
 */

export const repoModel = mongoose.model("Repo", repoSchema)