import { Octokit } from "@octokit/rest";

export async function createClintToken(installationId) {
    new Octokit({
        authStrategy: require("@octokit/auth-app"),
        auth: {
            appId: process.env.GITHUB_APP_ID,
            privateKey: process.env.GITHUB_PRIVATE_KEY,
            installationId
        },
    });
}

export async function getRepos(installationId) {
    const github = createClintToken(installationId);

    const repos = await github.paginate(github.apps.listReposAccessibleToInstallation, {
        per_page: 100,
    });

    return repos;
}

export async function getRepo(installationId, owner, repo) {
    const github = createClintToken(installationId);

    const { data } = await github.repos.get({
        owner,
        repo
    });

    return data;
}