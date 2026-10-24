import { App } from "octokit";

const githubApp = new App({
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY.replace(/\\n/g, "\n"),
});

export async function githubAppToken(installationId) {
    return await githubApp.getInstallationOctokit(installationId);
}