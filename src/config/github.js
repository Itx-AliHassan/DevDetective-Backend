import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    authStrategy: "app",
    auth:{
        appId: process.env.GITHUB_APP_ID, 
        privateKey: process.env.GITHUB_PRIVATE_KEY,
    }
})

export default octokit;