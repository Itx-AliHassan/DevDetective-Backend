export async function installGithubApp(req, res) {
    const installUrl = 'https://github.com/apps/devdetective-app/installations/new';

    res.redirect(installUrl);
}

async function verifyGithubApp(req, res) { }

async function saveToken(req, res) { }