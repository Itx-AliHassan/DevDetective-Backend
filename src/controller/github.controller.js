import "dotenv/config";
import { Octokit } from "@octokit/rest";

export const connectGitHub = async (req, res) => {
    const appName = process.env.GITHUB_APP_NAME
    res.redirect(`https://github.com/apps/${appName}/installations/new`)
}

export const getReposName = async (req, res) => {
    const { installationToken } = req.body
    const octokit = new Octokit({ auth: installationToken })
    const { data } = await octokit.request("GET /installation/repositories")
    console.log("github Data", data)
}

export const getRepo = async (req, res) => { }