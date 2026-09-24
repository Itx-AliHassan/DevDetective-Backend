import nodemailer from "nodemailer";

const user = process.env.NODEMAILER_EMAIL
const pass = process.env.NODEMAILER_PASS
const year = new Date().getFullYear()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user,
        pass
    }
})

/**
 * - There is 2 params 'to' & 'data'
 * - 'to' enter the Email of the user
 * - 'data' this is an obj give this data
 * - name, dashboardUrl
 */

export async function welcomeMail(to, data) {

    const { name, dashboardUrl } = data

    await transporter.sendMail({
        from: `"DevDetective" ${name}`,
        to,
        subject: "Welcome to DevDetective",
        html: `        
<div style="margin:0; padding:0; background-color:#080A12; font-family:Arial,Helvetica,sans-serif; color:#F8FAFC;">
    <div style="max-width:600px; margin:0 auto; padding:40px 20px;">

        <!-- Logo / Brand -->
        <div style="text-align:center; margin-bottom:30px;">
            <div style="display:inline-block; padding:12px 18px; border:1px solid #252A3A; border-radius:12px; background-color:#0F1220;">
                <span style="font-size:22px; font-weight:700; color:#F8FAFC;">
                    🕵️ Dev<span style="color:#A3E635;">Detective</span>
                </span>
            </div>
        </div>

        <!-- Main Card -->
        <div style="background-color:#0F1220; border:1px solid #252A3A; border-radius:16px; padding:40px 30px;">

            <!-- Greeting -->
            <h1 style="margin:0 0 15px 0; font-size:28px; line-height:1.3; color:#F8FAFC;">
                Welcome to DevDetective 👋
            </h1>

            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                Hey <strong style="color:#F8FAFC;">${name}</strong>,
            </p>

            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                Welcome to <strong style="color:#F8FAFC;">DevDetective</strong> — your personal
                code detective.
            </p>

            <p style="margin:0 0 25px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                Connect your GitHub repositories, scan your code, discover potential issues,
                and get detailed reports that help you understand what is happening inside
                your projects.
            </p>

            <!-- Feature Box -->
            <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:12px; padding:22px; margin-bottom:30px;">

                <p style="margin:0 0 14px 0; font-size:15px; font-weight:700; color:#F8FAFC;">
                    🔎 What you can do
                </p>

                <p style="margin:8px 0; font-size:14px; line-height:1.6; color:#94A3B8;">
                    🐙 Connect your GitHub repositories
                </p>

                <p style="margin:8px 0; font-size:14px; line-height:1.6; color:#94A3B8;">
                    🔍 Analyze your code
                </p>

                <p style="margin:8px 0; font-size:14px; line-height:1.6; color:#94A3B8;">
                    🐛 Detect potential issues
                </p>

                <p style="margin:8px 0; font-size:14px; line-height:1.6; color:#94A3B8;">
                    📊 Generate repository reports
                </p>

            </div>

            <!-- CTA -->
            <div style="text-align:center; margin-bottom:30px;">
                <a href="${dashboardUrl}"
                   style="display:inline-block; padding:14px 28px; background-color:#A3E635; color:#080A12; text-decoration:none; font-size:15px; font-weight:700; border-radius:10px;">
                    Open DevDetective →
                </a>
            </div>

            <p style="margin:0; font-size:14px; line-height:1.7; color:#64748B;">
                Time to investigate some code. 🕵️‍♂️
            </p>

        </div>

        <!-- Footer -->
        <div style="text-align:center; padding:25px 10px 10px 10px;">

            <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                © ${year} DevDetective
            </p>

            <p style="margin:0; font-size:12px; color:#475569;">
                Automated email — please don't reply to this message.
            </p>

        </div>

    </div>
</div>
        `
    })
}

/**
 * - There is 2 params 'to' & 'data'
 * - 'to' enter the Email of the user
 * - 'data' this is an obj give this data
 * - name, url, expiresIn
 */

export async function passwordResetEmail(to, data) {

    const { name, url, expiresIn } = data

    await transporter.sendMail({
        from: `"DevDetective" ${name}`,
        to,
        subject: "Account Password Reset",
        html: `
        <div style="margin:0; padding:0; background-color:#080A12; font-family:Arial,Helvetica,sans-serif; color:#F8FAFC;">
    <div style="max-width:600px; margin:0 auto; padding:40px 20px;">

        <!-- Brand -->
        <div style="text-align:center; margin-bottom:30px;">
            <div style="display:inline-block; padding:12px 18px; border:1px solid #252A3A; border-radius:12px; background-color:#0F1220;">
                <span style="font-size:22px; font-weight:700; color:#F8FAFC;">
                    🕵️ Dev<span style="color:#A3E635;">Detective</span>
                </span>
            </div>
        </div>

        <!-- Main Card -->
        <div style="background-color:#0F1220; border:1px solid #252A3A; border-radius:16px; padding:40px 30px;">

            <!-- Icon -->
            <div style="text-align:center; margin-bottom:25px;">
                <div style="display:inline-block; width:60px; height:60px; line-height:60px; border-radius:50%; background-color:#171A2B; border:1px solid #252A3A; font-size:28px;">
                    🔐
                </div>
            </div>

            <!-- Heading -->
            <h1 style="margin:0 0 15px 0; text-align:center; font-size:28px; line-height:1.3; color:#F8FAFC;">
                Reset Your Password
            </h1>

            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                Hey <strong style="color:#F8FAFC;">${name}</strong>,
            </p>

            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                We received a request to reset the password for your
                <strong style="color:#F8FAFC;">DevDetective</strong> account.
            </p>

            <p style="margin:0 0 30px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                If you made this request, click the button below to create a new password.
            </p>

            <!-- CTA -->
            <div style="text-align:center; margin-bottom:30px;">
                <a href="${url}""
                   style="display:inline-block; padding:14px 30px; background-color:#A3E635; color:#080A12; text-decoration:none; font-size:15px; font-weight:700; border-radius:10px;">
                    Reset Password →
                </a>
            </div>

            <!-- Expiry Notice -->
            <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:12px; padding:18px; margin-bottom:25px;">
                <p style="margin:0; font-size:14px; line-height:1.6; color:#94A3B8;">
                    ⏱️ This password reset link will expire in
                    <strong style="color:#F8FAFC;">${expiresIn}</strong>.
                </p>
            </div>

            <!-- Security Notice -->
            <p style="margin:0 0 15px 0; font-size:14px; line-height:1.7; color:#64748B;">
                <strong style="color:#94A3B8;">Didn't request this?</strong>
                You can safely ignore this email. Your password will remain unchanged.
            </p>

            <p style="margin:0; font-size:14px; line-height:1.7; color:#64748B;">
                For your security, never share this password reset link with anyone.
            </p>

        </div>

        <!-- Footer -->
        <div style="text-align:center; padding:25px 10px 10px 10px;">

            <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                © ${year} DevDetective
            </p>

            <p style="margin:0; font-size:12px; color:#475569;">
                Automated email — please don't reply to this message.
            </p>

        </div>

    </div>
</div>
        `,
    })
}

/**
 * - There is 2 params 'to' & 'data'
 * - 'to' enter the Email of the user
 * - 'data' this is an obj give this data
 * - name, githubUsername, url
 */

export async function githubConnectedEmail(to, data) {

    const { name, githubUsername, url } = data

    await transporter.sendMail({
        from: `"DevDetective" ${name}`,
        to,
        subject: "An GitHub account is connected",
        html: `<div style="margin:0; padding:0; background-color:#080A12; font-family:Arial,Helvetica,sans-serif; color:#F8FAFC;">
    <div style="max-width:600px; margin:0 auto; padding:40px 20px;">

        <!-- Brand -->
        <div style="text-align:center; margin-bottom:30px;">
            <div style="display:inline-block; padding:12px 18px; border:1px solid #252A3A; border-radius:12px; background-color:#0F1220;">
                <span style="font-size:22px; font-weight:700; color:#F8FAFC;">
                    🕵️ Dev<span style="color:#A3E635;">Detective</span>
                </span>
            </div>
        </div>

        <!-- Main Card -->
        <div style="background-color:#0F1220; border:1px solid #252A3A; border-radius:16px; padding:40px 30px;">

            <!-- Success Icon -->
            <div style="text-align:center; margin-bottom:25px;">
                <div style="display:inline-block; width:60px; height:60px; line-height:60px; border-radius:50%; background-color:#171A2B; border:1px solid #252A3A; font-size:28px;">
                    🐙
                </div>
            </div>

            <!-- Heading -->
            <h1 style="margin:0 0 15px 0; text-align:center; font-size:28px; line-height:1.3; color:#F8FAFC;">
                GitHub Connected!
            </h1>

            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                Hey <strong style="color:#F8FAFC;">${username}</strong>,
            </p>

            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                Your GitHub account has been successfully connected to
                <strong style="color:#F8FAFC;">DevDetective</strong>.
            </p>

            <!-- GitHub Account -->
            <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:12px; padding:20px; margin-bottom:25px;">

                <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                    GITHUB ACCOUNT
                </p>

                <p style="margin:0; font-size:17px; font-weight:700; color:#F8FAFC;">
                    @${githubUsername}
                </p>

            </div>

            <p style="margin:0 0 25px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                You can now connect your repositories, analyze your code,
                detect potential issues, and generate detailed reports.
            </p>

            <!-- CTA -->
            <div style="text-align:center; margin-bottom:30px;">
                <a href="${url}"
                   style="display:inline-block; padding:14px 28px; background-color:#A3E635; color:#080A12; text-decoration:none; font-size:15px; font-weight:700; border-radius:10px;">
                    Explore Repositories →
                </a>
            </div>

            <!-- Security Notice -->
            <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:12px; padding:18px;">
                <p style="margin:0; font-size:14px; line-height:1.6; color:#94A3B8;">
                    🔒 If you didn't connect this GitHub account to DevDetective,
                    please review your account activity and revoke the connection.
                </p>
            </div>

        </div>

        <!-- Footer -->
        <div style="text-align:center; padding:25px 10px 10px 10px;">

            <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                © ${year} DevDetective
            </p>

            <p style="margin:0; font-size:12px; color:#475569;">
                Automated email — please don't reply to this message.
            </p>

        </div>

    </div>
</div>`
    })
}

/**
 * - There is 2 params 'to' & 'data'
 * - 'to' enter the Email of the user
 * - 'data' this is an obj give this data
 * - project, name, repoName, scanDate, score, color, issuesCount, url
 */

export async function scanReport(to, data) {

    const { project, name, repoName, scanDate, score, color, issuesCount, url } = data

    await transporter.sendMail({
        from: `DevDetective Scan Report of ${project}`,
        to,
        subject: "Your Repo scan Report",
        html: `<div style="margin:0; padding:0; background-color:#080A12; font-family:Arial,Helvetica,sans-serif; color:#F8FAFC;">
    <div style="max-width:600px; margin:0 auto; padding:40px 20px;">

        <!-- Brand -->
        <div style="text-align:center; margin-bottom:30px;">
            <div style="display:inline-block; padding:12px 18px; border:1px solid #252A3A; border-radius:12px; background-color:#0F1220;">
                <span style="font-size:22px; font-weight:700; color:#F8FAFC;">
                    🕵️ Dev<span style="color:#A3E635;">Detective</span>
                </span>
            </div>
        </div>

        <!-- Main Card -->
        <div style="background-color:#0F1220; border:1px solid #252A3A; border-radius:16px; padding:40px 30px;">

            <!-- Success Icon -->
            <div style="text-align:center; margin-bottom:25px;">
                <div style="display:inline-block; width:60px; height:60px; line-height:60px; border-radius:50%; background-color:#171A2B; border:1px solid #252A3A; font-size:28px;">
                    🔎
                </div>
            </div>

            <!-- Heading -->
            <h1 style="margin:0 0 15px 0; text-align:center; font-size:28px; line-height:1.3; color:#F8FAFC;">
                Repository Scan Complete
            </h1>

            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                Hey <strong style="color:#F8FAFC;">${name}</strong>,
            </p>

            <p style="margin:0 0 25px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                DevDetective has finished analyzing your repository.
                Your latest development report is ready to review.
            </p>

            <!-- Repository Info -->
            <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:12px; padding:20px; margin-bottom:25px;">

                <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                    REPOSITORY
                </p>

                <p style="margin:0 0 18px 0; font-size:18px; font-weight:700; color:#F8FAFC;">
                    ${repoName}
                </p>

                <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                    SCAN COMPLETED
                </p>

                <p style="margin:0; font-size:14px; color:#94A3B8;">
                    ${scanDate}
                </p>

            </div>

            <!-- Report Summary -->
            <div style="margin-bottom:30px;">

                <p style="margin:0 0 15px 0; font-size:15px; font-weight:700; color:#F8FAFC;">
                    📊 Report Summary
                </p>

                <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:10px; padding:15px; margin-bottom:10px;">
                    <span style="font-size:14px; color:#94A3B8;">
                        Overall Score
                    </span>
                    <span style="float:right; font-size:15px; font-weight:700; color:${color};">
                        ${score} / 100
                    </span>
                </div>

                <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:10px; padding:15px;">
                    <span style="font-size:14px; color:#94A3B8;">
                        Issues Detected
                    </span>
                    <span style="float:right; font-size:15px; font-weight:700; color:#F8FAFC;">
                        ${issuesCount}
                    </span>
                </div>

            </div>

            <!-- CTA -->
            <div style="text-align:center; margin-bottom:30px;">
                <a href="${url}"
                   style="display:inline-block; padding:14px 30px; background-color:#A3E635; color:#080A12; text-decoration:none; font-size:15px; font-weight:700; border-radius:10px;">
                    View Full Report →
                </a>
            </div>

            <p style="margin:0; font-size:14px; line-height:1.7; color:#64748B;">
                Dive into the report to see detected issues, code quality insights,
                security findings, and recommendations for your repository.
            </p>

        </div>

        <!-- Footer -->
        <div style="text-align:center; padding:25px 10px 10px 10px;">

            <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                © ${year} DevDetective
            </p>

            <p style="margin:0; font-size:12px; color:#475569;">
                Automated email — please don't reply to this message.
            </p>

        </div>

    </div>
</div>`
    })
}

/**
 * - There is 2 params 'to' & 'data'
 * - 'to' enter the Email of the user
 * - 'data' this is an obj give this data
 * - project, name, repoName, scanDate, errorMessage, url
 */

export async function scanFail(to, data) {

    const { project, name, repoName, scanDate, errorMessage, url } = data

    await transporter.sendMail({
        from: "DevDetective",
        to,
        subject: `Scan fail of project ${project}`,
        html: `<div style="margin:0; padding:0; background-color:#080A12; font-family:Arial,Helvetica,sans-serif; color:#F8FAFC;">
    <div style="max-width:600px; margin:0 auto; padding:40px 20px;">

        <!-- Brand -->
        <div style="text-align:center; margin-bottom:30px;">
            <div style="display:inline-block; padding:12px 18px; border:1px solid #252A3A; border-radius:12px; background-color:#0F1220;">
                <span style="font-size:22px; font-weight:700; color:#F8FAFC;">
                    🕵️ Dev<span style="color:#A3E635;">Detective</span>
                </span>
            </div>
        </div>

        <!-- Main Card -->
        <div style="background-color:#0F1220; border:1px solid #252A3A; border-radius:16px; padding:40px 30px;">

            <!-- Warning Icon -->
            <div style="text-align:center; margin-bottom:25px;">
                <div style="display:inline-block; width:60px; height:60px; line-height:60px; border-radius:50%; background-color:#171A2B; border:1px solid #252A3A; font-size:28px;">
                    ⚠️
                </div>
            </div>

            <!-- Heading -->
            <h1 style="margin:0 0 15px 0; text-align:center; font-size:28px; line-height:1.3; color:#F8FAFC;">
                Repository Scan Failed
            </h1>

            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                Hey <strong style="color:#F8FAFC;">${name}</strong>,
            </p>

            <p style="margin:0 0 25px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                DevDetective couldn't complete the analysis of your repository.
                No report was generated for this scan.
            </p>

            <!-- Repository Info -->
            <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:12px; padding:20px; margin-bottom:25px;">

                <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                    REPOSITORY
                </p>

                <p style="margin:0 0 18px 0; font-size:18px; font-weight:700; color:#F8FAFC;">
                    ${repoName}
                </p>

                <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                    SCAN STARTED
                </p>

                <p style="margin:0; font-size:14px; color:#94A3B8;">
                    ${scanDate}
                </p>

            </div>

            <!-- Error Details -->
            <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:12px; padding:20px; margin-bottom:25px;">

                <p style="margin:0 0 10px 0; font-size:14px; font-weight:700; color:#F8FAFC;">
                    🔍 What happened?
                </p>

                <p style="margin:0; font-size:14px; line-height:1.7; color:#94A3B8;">
                    ${errorMessage}
                </p>

            </div>

            <!-- Retry Notice -->
            <p style="margin:0 0 25px 0; font-size:14px; line-height:1.7; color:#64748B;">
                You can try running the scan again from your DevDetective dashboard.
                If the problem continues, check your repository connection and try again later.
            </p>

            <!-- CTA -->
            <div style="text-align:center; margin-bottom:30px;">
                <a href="${url}"
                   style="display:inline-block; padding:14px 28px; background-color:#A3E635; color:#080A12; text-decoration:none; font-size:15px; font-weight:700; border-radius:10px;">
                    Try Again →
                </a>
            </div>

            <p style="margin:0; font-size:13px; line-height:1.7; color:#64748B;">
                If you didn't start this scan manually, it may have been triggered
                by your scheduled analysis settings.
            </p>

        </div>

        <!-- Footer -->
        <div style="text-align:center; padding:25px 10px 10px 10px;">

            <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                © ${year} DevDetective
            </p>

            <p style="margin:0; font-size:12px; color:#475569;">
                Automated email — please don't reply to this message.
            </p>

        </div>

    </div>
</div>`
    })
}

/**
 * - There is 2 params 'to' & 'data'
 * - 'to' enter the Email of the user
 * - 'data' this is an obj give this data
 * - project, name, startDate, endDate, repoReport, issues, score, url, highlight, settingUrl
 */

export async function weeklyReport(to, data) {

    const { project, name, startDate, endDate, repoReport, issues, score, url, highlight, settingUrl } = data

    await transporter.sendMail({
        from: "DevDetective",
        to,
        subject: `Weekly Report of the project ${project}`,
        html: `<div style="margin:0; padding:0; background-color:#080A12; font-family:Arial,Helvetica,sans-serif; color:#F8FAFC;">
    <div style="max-width:600px; margin:0 auto; padding:40px 20px;">

        <!-- Brand -->
        <div style="text-align:center; margin-bottom:30px;">
            <div style="display:inline-block; padding:12px 18px; border:1px solid #252A3A; border-radius:12px; background-color:#0F1220;">
                <span style="font-size:22px; font-weight:700; color:#F8FAFC;">
                    🕵️ Dev<span style="color:#A3E635;">Detective</span>
                </span>
            </div>
        </div>

        <!-- Main Card -->
        <div style="background-color:#0F1220; border:1px solid #252A3A; border-radius:16px; padding:40px 30px;">

            <!-- Icon -->
            <div style="text-align:center; margin-bottom:25px;">
                <div style="display:inline-block; width:60px; height:60px; line-height:60px; border-radius:50%; background-color:#171A2B; border:1px solid #252A3A; font-size:28px;">
                    📊
                </div>
            </div>

            <!-- Heading -->
            <h1 style="margin:0 0 15px 0; text-align:center; font-size:28px; line-height:1.3; color:#F8FAFC;">
                Your Weekly Report Is Ready
            </h1>

            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                Hey <strong style="color:#F8FAFC;">${name}</strong>,
            </p>

            <p style="margin:0 0 25px 0; font-size:16px; line-height:1.7; color:#94A3B8;">
                Your scheduled DevDetective analysis is complete.
                Here's a quick look at your repository activity for this week.
            </p>

            <!-- Report Period -->
            <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:12px; padding:20px; margin-bottom:25px;">

                <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                    REPORT PERIOD
                </p>

                <p style="margin:0; font-size:17px; font-weight:700; color:#F8FAFC;">
                    ${startDate} — ${endDate}
                </p>

            </div>

            <!-- Summary -->
            <div style="margin-bottom:30px;">

                <p style="margin:0 0 15px 0; font-size:15px; font-weight:700; color:#F8FAFC;">
                    📈 Weekly Summary
                </p>

                <!-- Repositories -->
                <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:10px; padding:15px; margin-bottom:10px;">
                    <span style="font-size:14px; color:#94A3B8;">
                        Repositories Analyzed
                    </span>

                    <span style="float:right; font-size:15px; font-weight:700; color:#F8FAFC;">
                        ${repoReport}
                    </span>
                </div>

                <!-- Issues -->
                <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:10px; padding:15px; margin-bottom:10px;">
                    <span style="font-size:14px; color:#94A3B8;">
                        Issues Detected
                    </span>

                    <span style="float:right; font-size:15px; font-weight:700; color:#F8FAFC;">
                        ${issues}
                    </span>
                </div>

                <!-- Average Score -->
                <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:10px; padding:15px;">
                    <span style="font-size:14px; color:#94A3B8;">
                        Average Score
                    </span>

                    <span style="float:right; font-size:15px; font-weight:700; color:${color};">
                        ${score} / 100
                    </span>
                </div>

            </div>

            <!-- Highlight -->
            <div style="background-color:#171A2B; border:1px solid #252A3A; border-radius:12px; padding:20px; margin-bottom:30px;">

                <p style="margin:0 0 10px 0; font-size:14px; font-weight:700; color:#F8FAFC;">
                    🔎 Weekly Highlight
                </p>

                <p style="margin:0; font-size:14px; line-height:1.7; color:#94A3B8;">
                    ${highlight}
                </p>

            </div>

            <!-- CTA -->
            <div style="text-align:center; margin-bottom:30px;">
                <a href="${url}"
                   style="display:inline-block; padding:14px 30px; background-color:#A3E635; color:#080A12; text-decoration:none; font-size:15px; font-weight:700; border-radius:10px;">
                    View Full Report →
                </a>
            </div>

            <p style="margin:0; font-size:13px; line-height:1.7; color:#64748B;">
                This report was automatically generated based on your scheduled
                DevDetective analysis settings.
            </p>

        </div>

        <!-- Footer -->
        <div style="text-align:center; padding:25px 10px 10px 10px;">

            <p style="margin:0 0 8px 0; font-size:13px; color:#64748B;">
                © ${year} DevDetective
            </p>

            <p style="margin:0 0 8px 0; font-size:12px; color:#475569;">
                You're receiving this because weekly reports are enabled on your account.
            </p>

            <p style="margin:0; font-size:12px; color:#475569;">
                <a href="${settingUrl}" style="color:#64748B; text-decoration:underline;">
                    Manage email preferences
                </a>
            </p>

        </div>

    </div>
</div>`
    })
}