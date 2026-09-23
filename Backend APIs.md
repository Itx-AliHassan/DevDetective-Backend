# DevDetective Backend APIs

## 🔐 User / Auth

Clerk handles authentication, so **no custom login/register/logout APIs** are needed.

### GET `/api/me`

Get the currently authenticated user's DevDetective information.

**Use:** Check current user and their DevDetective account data.

---

# 🐙 GitHub

### GET `/api/github-status`

Check whether the user has connected GitHub.

**Use:** Show:

```text
GitHub Connected ✓
```

or:

```text
Connect GitHub
```

---

### GET `/api/connect-github`

Start/connect the user's GitHub account.

**Use:** Connect GitHub so DevDetective can access the user's repositories.

> Depending on the final Clerk OAuth setup, this may be handled by the frontend/Clerk flow rather than being a traditional backend GET route.

---

### GET `/api/github-user`

Get the connected GitHub user's information.

**Use:** Get:

```text
Username
Name
Avatar
GitHub profile URL
```

---

### GET `/api/get-repos`

Get all repositories accessible to the connected GitHub account.

**Use:** Display the user's repositories so they can choose one to analyze.

Example:

```text
AudioVault
BankSystem
DevDetective
ChessGame
```

---

### GET `/api/get-repo/:repoId`

Get details of one repository.

**Use:** Show repository information before starting a scan.

---

### GET `/api/get-repo-files/:repoId`

Get the files/folders inside a repository.

**Use:** Get the project structure that DevDetective needs to analyze.

---

### GET `/api/get-file`

Get the content of a specific repository file.

**Use:** Read source code from GitHub for analysis.

Example:

```text
/api/get-file?repoId=123&path=src/server.js
```

---

# 🔍 Scanning

### POST `/api/create-scan`

Create/start a new repository scan.

**Use:** Start analyzing a selected repository.

---

### GET `/api/scans`

Get the user's previous scans.

**Use:** Display scan history.

---

### GET `/api/scan/:scanId`

Get details of a specific scan.

**Use:** Show scan information and results.

---

### GET `/api/scan-status/:scanId`

Get the current scan status.

**Use:** Show progress such as:

```text
QUEUED
RUNNING
COMPLETED
FAILED
```

---

# 🚨 Issues

### GET `/api/get-issues/:scanId`

Get all issues found during a scan.

**Use:** Display detected problems.

Example:

```text
🔴 Critical
🟠 High
🟡 Medium
🔵 Low
```

---

### GET `/api/get-issue/:issueId`

Get details of one issue.

**Use:** Show:

```text
Problem
File
Line
Severity
Explanation
Recommendation
```

---

### PATCH `/api/update-issue/:issueId`

Update an issue's status.

**Use:** Mark an issue as:

```text
OPEN
RESOLVED
IGNORED
```

---

# 📊 Reports

### GET `/api/get-report/:scanId`

Get the complete report generated from a scan.

**Use:** Display the final analysis report.

---

### GET `/api/get-score/:scanId`

Get the project's analysis scores.

**Use:** Display things like:

```text
Overall: 82

Security:     90
Code Quality: 84
Architecture: 78
Testing:      65
Documentation:72
```

---

# 🤖 AI

### POST `/api/explain-issue/:issueId`

Ask the AI to explain a detected issue.

**Use:** Give the developer a simple explanation of the problem.

---

### POST `/api/generate-suggestions/:scanId`

Generate AI-powered improvement suggestions.

**Use:** Tell the developer how they can improve the project.

---

# 📈 Dashboard

### GET `/api/dashboard`

Get the main dashboard data.

**Use:** Return things like:

```text
Total Repositories
Total Scans
Total Issues
Average Score
Recent Scans
Recent Issues
```

---

# ❤️ System

### GET `/api/health`

Check whether the backend is running.

**Use:** Server health check.

---

# 🚀 Final API List

```text
AUTH / USER
GET    /api/me


GITHUB
GET    /api/github-status
GET    /api/connect-github
GET    /api/github-user
GET    /api/get-repos
GET    /api/get-repo/:repoId
GET    /api/get-repo-files/:repoId
GET    /api/get-file


SCANS
POST   /api/create-scan
GET    /api/scans
GET    /api/scan/:scanId
GET    /api/scan-status/:scanId


ISSUES
GET    /api/get-issues/:scanId
GET    /api/get-issue/:issueId
PATCH  /api/update-issue/:issueId


REPORTS
GET    /api/get-report/:scanId
GET    /api/get-score/:scanId


AI
POST   /api/explain-issue/:issueId
POST   /api/generate-suggestions/:scanId


DASHBOARD
GET    /api/dashboard


SYSTEM
GET    /api/health
```

## ⭐ APIs You Build First

Don't build everything at once.

Start with:

```text
1.  GET  /api/me
2.  GET  /api/github-status
3.  GET  /api/github-user
4.  GET  /api/get-repos
5.  GET  /api/get-repo/:repoId
6.  GET  /api/get-repo-files/:repoId
7.  GET  /api/get-file
8.  POST /api/create-scan
9.  GET  /api/scan-status/:scanId
10. GET /api/get-issues/:scanId
11. GET /api/get-report/:scanId
```

Then build the AI/dashboard stuff.

**Clerk handles authentication. Your APIs handle DevDetective.** 🔥
