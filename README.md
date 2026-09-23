# 🕵️ DevDetective — Backend Development Guide

## 1. Backend Purpose

The DevDetective backend is the **central brain and controller** of the application.

It connects:

```text
React Frontend
      ↓
Node.js Backend
      ↓
 ┌────┼──────────┬───────────┐
 ↓    ↓          ↓           ↓
Mongo GitHub   Python       AI
DB     API     Analyzer    Service
```

The backend is responsible for:

* User authentication
* GitHub authentication
* Repository management
* Starting scans
* Managing scan status
* Sending repositories to the Python analyzer
* Receiving analysis results
* Sending findings to the AI service
* Calculating project scores
* Saving results in MongoDB
* Providing reports to the frontend
* Handling errors and security

---

# 2. Recommended Backend Architecture

Use **two backend services**:

### Main Backend

```text
Node.js + Express
```

### Analysis Engine

```text
Python
```

Node.js handles the application/business logic.

Python handles the heavy code-analysis work.

Do not put the entire project into one Node.js application.

Recommended:

```text
backend/
│
├── Node.js API
│
└── analyzer/
    └── Python
```

---

# 3. Why Node.js + Python?

## Node.js

Node.js is ideal for:

* REST APIs
* Authentication
* GitHub API
* MongoDB
* Request handling
* WebSocket/SSE communication
* Managing scan jobs
* Connecting frontend and services

Since the frontend is also JavaScript, this keeps the main application consistent.

## Python

Python is ideal for:

* AST parsing
* Static code analysis
* Security scanning
* Code metrics
* Source-code processing
* Running analysis tools
* AI/data-processing workflows

Therefore:

```text
Node.js = Application Backend

Python = Code Analysis Engine
```

---

# 4. Backend Folder Structure

Recommended structure:

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── github.controller.js
│   │   ├── repository.controller.js
│   │   ├── scan.controller.js
│   │   └── report.controller.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Repository.js
│   │   ├── Scan.js
│   │   ├── Issue.js
│   │   └── Report.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── github.routes.js
│   │   ├── repository.routes.js
│   │   ├── scan.routes.js
│   │   └── report.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── rateLimit.middleware.js
│   │
│   ├── services/
│   │   ├── github.service.js
│   │   ├── scan.service.js
│   │   ├── analyzer.service.js
│   │   └── ai.service.js
│   │
│   ├── utils/
│   │   ├── scoring.js
│   │   ├── validators.js
│   │   └── logger.js
│   │
│   └── app.js
│
├── analyzer/
│   │
│   ├── analyzers/
│   ├── parsers/
│   ├── scanners/
│   ├── scoring/
│   ├── ai/
│   ├── models/
│   ├── requirements.txt
│   └── main.py
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

You don't have to create every file on day one.

Create them when the feature needs them.

---

# 5. Required Node.js Packages

Start with:

```bash
npm install express mongoose dotenv cors cookie-parser jsonwebtoken bcryptjs axios
```

Development:

```bash
npm install -D nodemon
```

For validation:

```bash
npm install zod
```

For security/rate limiting:

```bash
npm install helmet express-rate-limit
```

For GitHub:

```bash
npm install @octokit/rest
```

The exact GitHub package can be changed later if needed.

---

# 6. Backend Environment Variables

Create:

```text
.env
```

Example:

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=

AI_API_KEY=

FRONTEND_URL=
```

Never commit `.env`.

Create:

```text
.env.example
```

containing only variable names.

---

# 7. Database

Use:

```text
MongoDB
```

with:

```text
Mongoose
```

Main collections:

```text
users
repositories
scans
issues
reports
```

---

# 8. User Model

The User model handles DevDetective accounts.

Example fields:

```text
User
├── name
├── email
├── password
├── githubId
├── githubUsername
├── createdAt
└── updatedAt
```

The GitHub access token should be handled securely.

Do not expose it to the React application.

---

# 9. Authentication

DevDetective needs normal application authentication.

Recommended flow:

```text
Register
   ↓
Hash Password
   ↓
Save User
```

Login:

```text
Email + Password
       ↓
Compare Password
       ↓
Generate JWT
       ↓
HTTP-only Cookie
```

Protected request:

```text
Browser
   ↓
Cookie
   ↓
Node.js
   ↓
Auth Middleware
   ↓
Controller
```

Use:

```text
bcryptjs
jsonwebtoken
cookie-parser
```

---

# 10. GitHub Authentication

GitHub authentication is separate from DevDetective authentication.

Flow:

```text
User
 ↓
"Connect GitHub"
 ↓
GitHub OAuth
 ↓
User grants permission
 ↓
GitHub callback
 ↓
Node.js
 ↓
Store required GitHub identity/token securely
```

After connection:

```text
GET /api/github/repositories
```

returns repositories the user is allowed to analyze.

---

# 11. GitHub Service

Create:

```text
services/github.service.js
```

This service should handle GitHub communication.

Responsibilities:

```text
Get user information
Get repositories
Get repository details
Get branches
Get repository files
Get file contents
Create webhook if required
```

The controller should not contain all the GitHub API logic.

Instead:

```text
Controller
    ↓
GitHub Service
    ↓
GitHub API
```

---

# 12. Repository Model

Store information about repositories that the user has connected/analyzed.

Example:

```text
Repository
├── userId
├── githubRepoId
├── name
├── fullName
├── owner
├── language
├── defaultBranch
├── url
└── createdAt
```

Do not store an entire repository inside MongoDB.

Store repository metadata and analysis results.

---

# 13. Repository API

Recommended endpoints:

```http
GET /api/repositories
GET /api/repositories/:id
POST /api/repositories
DELETE /api/repositories/:id
```

Possible flow:

```text
GitHub
 ↓
Repository List
 ↓
User selects repository
 ↓
Save repository metadata
 ↓
Repository becomes available in dashboard
```

---

# 14. Scan System

This is the **core backend feature**.

When the user clicks:

```text
Analyze Repository
```

the backend should NOT perform everything inside the HTTP request.

Instead:

```text
POST /api/scans
        ↓
Create Scan
        ↓
Status = QUEUED
        ↓
Start Analysis
        ↓
Python Analyzer
        ↓
Results
        ↓
MongoDB
        ↓
Status = COMPLETED
```

---

# 15. Scan Model

Example:

```text
Scan
├── repositoryId
├── status
├── startedAt
├── completedAt
├── securityScore
├── qualityScore
├── architectureScore
├── testingScore
├── documentationScore
├── overallScore
└── error
```

Statuses:

```text
QUEUED
RUNNING
COMPLETED
FAILED
```

---

# 16. Starting a Scan

Endpoint:

```http
POST /api/scans
```

Request:

```json
{
  "repositoryId": "..."
}
```

Backend:

```text
Validate User
     ↓
Validate Repository
     ↓
Create Scan
     ↓
Download/prepare repository
     ↓
Start Python Analyzer
```

Return immediately:

```json
{
  "scanId": "...",
  "status": "QUEUED"
}
```

The frontend can then monitor the scan.

---

# 17. Repository Isolation

Never analyze repositories directly inside your permanent backend directory.

Create a temporary workspace:

```text
/tmp/devdetective/
       │
       └── scan-123/
             └── repository/
```

After analysis:

```text
Analysis Complete
      ↓
Save Results
      ↓
Delete Temporary Repository
```

This prevents temporary source code from accumulating on the server.

---

# 18. Python Analyzer

Python is the analysis engine.

Its job:

```text
Receive Repository
       ↓
Detect Languages
       ↓
Parse Files
       ↓
Run Analyzers
       ↓
Normalize Results
       ↓
Calculate Metrics
       ↓
Return JSON
```

---

# 19. Python Analyzer Structure

```text
analyzer/
│
├── analyzers/
│   ├── code_quality.py
│   ├── security.py
│   ├── architecture.py
│   ├── testing.py
│   └── documentation.py
│
├── parsers/
│   ├── javascript.py
│   └── python.py
│
├── scanners/
│   ├── secrets.py
│   └── dependencies.py
│
├── scoring/
│   └── score.py
│
├── models/
│   └── result.py
│
├── requirements.txt
└── main.py
```

---

# 20. Python Packages

Possible starting packages:

```text
tree-sitter
semgrep
bandit
```

For Python code quality:

```text
ruff
```

For JavaScript/TypeScript:

```text
eslint
```

Some tools can be executed as external CLI processes while Python acts as the orchestrator.

The goal is not to reinvent ESLint or Semgrep.

The goal is to **combine their findings into DevDetective's own system**.

---

# 21. Supported Languages

For the first version:

```text
JavaScript
TypeScript
Python
```

Don't try to support:

```text
Java
C
C++
C#
PHP
Go
Rust
Kotlin
Swift
...
```

during the first version.

More languages can be future scope.

---

# 22. Analysis Categories

The Python analyzer should produce findings under:

```text
SECURITY
QUALITY
ARCHITECTURE
PERFORMANCE
TESTING
DOCUMENTATION
```

Every finding should have a consistent structure.

Example:

```json
{
  "category": "SECURITY",
  "severity": "HIGH",
  "title": "Hardcoded Secret",
  "file": "config/auth.js",
  "line": 42,
  "message": "Potential secret detected.",
  "rule": "SECRET_001"
}
```

---

# 23. Issue Model

Store each finding separately.

```text
Issue
├── scanId
├── category
├── severity
├── rule
├── title
├── message
├── file
├── line
├── codeSnippet
├── recommendation
├── aiExplanation
└── status
```

This allows the frontend to filter issues.

Example:

```text
Security → Critical
Quality → Medium
Testing → Low
```

---

# 24. Security Analyzer

The first version should detect things such as:

```text
Hardcoded API keys
Hardcoded passwords
Potential tokens/secrets
Dangerous functions
Selected injection patterns
Weak authentication patterns
Missing input validation
Dependency vulnerabilities
```

Example:

```text
auth.js:42

CRITICAL
Hardcoded JWT Secret
```

The analyzer creates the finding.

AI explains it.

---

# 25. Code Quality Analyzer

Detect:

```text
Unused variables
Unused imports
Large functions
Complex functions
Duplicate code
Repeated logic
Poor patterns
Missing error handling
Code smells
```

Do not blindly label every unusual coding style as a bug.

A finding should have a reason and preferably a rule/source.

---

# 26. Architecture Analyzer

Analyze project structure.

Example:

```text
controllers/
models/
routes/
services/
middleware/
```

Look for:

```text
Circular dependencies
Extremely large modules
High coupling
Poor separation
Unusual dependency relationships
```

Architecture analysis should provide recommendations, not pretend that one architecture is always correct.

---

# 27. Testing Analyzer

The backend should determine whether important functionality appears to have tests.

Look for:

```text
tests/
__tests__/
*.test.js
*.spec.js
pytest tests
```

Then connect discovered tests with important application code where possible.

Example:

```text
login()
register()
sendMoney()
```

Result:

```text
login()       → No test detected
register()    → Test detected
sendMoney()   → No test detected
```

---

# 28. Documentation Analyzer

Analyze:

```text
README.md
Comments
JSDoc
Docstrings
API documentation
Environment documentation
```

Detect missing documentation.

Example:

```text
README.md exists
API documentation missing
Environment variables undocumented
Public functions lack documentation
```

---

# 29. AI Service

Create:

```text
services/ai.service.js
```

The Node.js backend communicates with the AI provider.

AI should primarily perform:

```text
Explain finding
Suggest improvement
Generate documentation
Suggest test cases
Summarize report
```

Avoid sending the entire repository to the AI unnecessarily.

Send relevant context.

Example:

```json
{
  "issue": "Hardcoded JWT secret",
  "file": "auth.js",
  "line": 42,
  "code": "...",
  "rule": "SECRET_001"
}
```

---

# 30. AI Output

Expected output:

```json
{
  "explanation": "...",
  "impact": "...",
  "recommendation": "...",
  "exampleFix": "..."
}
```

The AI should not determine the project's entire score by itself.

---

# 31. Scoring System

The backend should calculate scores.

Example:

```text
Security
Code Quality
Architecture
Testing
Documentation
```

Each category:

```text
0 - 100
```

Overall score:

```text
Security       30%
Quality        25%
Architecture   20%
Testing        15%
Documentation  10%
```

The exact weights should be documented and adjustable.

Important:

> The scoring algorithm belongs to the application, not the AI.

---

# 32. Report Generation

After analysis:

```text
Python Results
      ↓
Normalize Results
      ↓
Node.js
      ↓
Calculate Scores
      ↓
Generate Report
      ↓
Save MongoDB
```

Report example:

```json
{
  "scanId": "...",
  "scores": {
    "security": 82,
    "quality": 76,
    "architecture": 71,
    "testing": 48,
    "documentation": 63
  },
  "overallScore": 68
}
```

---

# 33. Report API

```http
GET /api/reports/:scanId
```

Return:

```text
Project Score
Category Scores
Issue Count
Critical Issues
High Issues
Medium Issues
Low Issues
Recommendations
```

---

# 34. Scan Status API

Frontend needs to know whether the analysis is complete.

Endpoint:

```http
GET /api/scans/:id/status
```

Example:

```json
{
  "status": "RUNNING",
  "progress": 65,
  "stage": "Security Analysis"
}
```

Possible stages:

```text
Repository Preparation
Code Analysis
Security Analysis
Architecture Analysis
Testing Analysis
Documentation Analysis
AI Analysis
Report Generation
Completed
```

---

# 35. Real-Time Progress

For the MVP:

```text
Polling
```

is enough.

Frontend:

```text
GET /api/scans/:id/status
```

every few seconds.

Later you can use:

```text
WebSocket
```

or:

```text
Server-Sent Events
```

for live progress.

Do not add WebSockets on day one unless you actually need them.

---

# 36. Error Handling

Every backend layer needs proper error handling.

Examples:

```text
GitHub API failed
Repository unavailable
Invalid repository
Python analyzer crashed
AI API failed
MongoDB unavailable
Scan timeout
Invalid GitHub permissions
```

Return consistent responses.

Example:

```json
{
  "success": false,
  "message": "Unable to analyze repository."
}
```

Don't expose internal stack traces to users.

---

# 37. Security Requirements

This project deals with source code and GitHub credentials, so security is critical.

Implement:

```text
HTTP-only cookies
Password hashing
JWT authentication
Input validation
Rate limiting
Helmet
CORS configuration
Secure GitHub token handling
Environment variables
Repository access validation
Temporary workspace cleanup
```

Most importantly:

### NEVER execute arbitrary repository code.

Don't do:

```bash
node index.js
```

or:

```bash
python app.py
```

on an untrusted repository.

Prefer static analysis.

---

# 38. Important GitHub Security Rule

The user may give DevDetective access to private repositories.

Therefore:

```text
Frontend
   ↓
Node.js
   ↓
GitHub Token
   ↓
GitHub API
```

The token should remain server-side.

Never return the raw GitHub access token to React.

---

# 39. Rate Limiting

Add rate limits to expensive endpoints.

Especially:

```text
POST /api/scans
```

because a repository scan consumes CPU, storage, and potentially AI API credits.

Example concept:

```text
User
 ↓
Start Scan
 ↓
Check rate limit
 ↓
Allowed?
 ├── Yes → Start
 └── No  → Reject
```

---

# 40. Scan Concurrency

Don't allow one user to start 50 scans simultaneously.

For MVP:

```text
1 active scan per user
```

is a reasonable starting point.

Later:

```text
Redis
+
BullMQ
+
Worker
```

can manage multiple scan jobs.

---

# 41. Recommended MVP Processing

For your FYP, keep it simple:

```text
POST /scans
      ↓
Create Scan
      ↓
Node.js starts Python
      ↓
Python analyzes repository
      ↓
Python returns JSON
      ↓
Node.js saves results
      ↓
Scan = COMPLETED
```

Don't introduce microservices, Kubernetes, Kafka, or other heavy infrastructure 😭.

You are building an FYP, not AWS.

---

# 42. Node ↔ Python Communication

Use JSON.

Input:

```json
{
  "scanId": "123",
  "repositoryPath": "/tmp/devdetective/123",
  "languages": [
    "javascript",
    "python"
  ]
}
```

Output:

```json
{
  "status": "completed",
  "scores": {
    "security": 82,
    "quality": 76
  },
  "issues": []
}
```

This keeps both systems independent.

---

# 43. Recommended Backend Flow

Complete flow:

```text
User
 ↓
React
 ↓
Node.js API
 ↓
Authentication
 ↓
GitHub API
 ↓
Repository Selection
 ↓
Create Scan
 ↓
Prepare Temporary Workspace
 ↓
Python Analyzer
 ↓
 ┌───────────────┐
 │ Code Quality  │
 │ Security      │
 │ Architecture  │
 │ Testing       │
 │ Documentation │
 └───────────────┘
 ↓
Normalized Findings
 ↓
AI Explanation
 ↓
Score Calculation
 ↓
MongoDB
 ↓
React Dashboard
```

---

# 44. Backend Development Order

Build in this order.

## Phase 1 — Server

```text
Node.js
Express
MongoDB
Environment variables
Error handling
```

## Phase 2 — Authentication

```text
Register
Login
Logout
Protected routes
```

## Phase 3 — GitHub

```text
OAuth
Repository listing
Repository selection
```

## Phase 4 — Repository Management

```text
Repository model
Repository APIs
Repository validation
```

## Phase 5 — Scan System

```text
Scan model
Create scan
Scan status
Temporary workspace
```

## Phase 6 — Python Analyzer

```text
Python setup
JavaScript analyzer
Python analyzer
Security analyzer
```

## Phase 7 — Results

```text
Issue model
Save findings
Calculate scores
Generate reports
```

## Phase 8 — AI

```text
AI service
Issue explanation
Recommendations
Test suggestions
Documentation generation
```

## Phase 9 — Frontend Integration

```text
Dashboard APIs
Report APIs
Scan status
Issue filtering
```

## Phase 10 — Security & Testing

```text
Rate limiting
Input validation
Security testing
API testing
Failure handling
Performance testing
```

---

# 45. Backend API Summary

Final planned API:

```text
AUTH
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GITHUB
GET    /api/github/connect
GET    /api/github/callback
GET    /api/github/repositories

REPOSITORIES
GET    /api/repositories
GET    /api/repositories/:id
POST   /api/repositories
DELETE /api/repositories/:id

SCANS
POST   /api/scans
GET    /api/scans
GET    /api/scans/:id
GET    /api/scans/:id/status

REPORTS
GET    /api/reports/:scanId
GET    /api/reports/:scanId/issues
GET    /api/reports/:scanId/score
```

---

# 46. What You Actually Need to Build

The backend can be divided into **8 major systems**:

```text
1. Authentication
       ↓
2. GitHub Integration
       ↓
3. Repository Management
       ↓
4. Scan Management
       ↓
5. Python Analysis Engine
       ↓
6. AI Service
       ↓
7. Scoring & Reporting
       ↓
8. Security & Infrastructure
```

These are the real backend components.

Everything else supports these systems.

---

# 47. What NOT to Build Initially

Avoid:

```text
❌ Microservices
❌ Kubernetes
❌ Complex distributed systems
❌ Automatic code modification
❌ 20+ programming languages
❌ Running user applications
❌ Full CI/CD platform
❌ Enterprise team management
❌ Advanced billing
❌ VS Code extension
```

These can become future scope.

---

# 48. Final Backend Technology List

### Application

```text
Node.js
Express.js
JavaScript
```

### Database

```text
MongoDB
Mongoose
```

### Authentication

```text
JWT
bcryptjs
HTTP-only Cookies
```

### GitHub

```text
GitHub OAuth
GitHub REST API
Octokit
```

### Analysis

```text
Python
AST / Tree-sitter
ESLint
Ruff
Semgrep
Bandit
```

### AI

```text
LLM API
```

### Security

```text
Helmet
Rate Limiting
Input Validation
CORS
```

### Development

```text
Git
GitHub
VS Code
Postman
```

### Optional Future Infrastructure

```text
Redis
BullMQ
Docker
GitHub Actions
```

---

# 49. Final Backend Goal

When the backend is finished, this should be possible:

```text
User logs in
      ↓
Connects GitHub
      ↓
Selects repository
      ↓
Clicks "Analyze"
      ↓
Backend creates scan
      ↓
Python analyzes repository
      ↓
Security + Quality + Architecture
      ↓
Testing + Documentation
      ↓
AI explains findings
      ↓
Backend calculates scores
      ↓
Results saved in MongoDB
      ↓
Frontend receives report
```

The backend should essentially answer one question:

> **"Give me a repository, and I'll safely analyze it, organize the findings, explain them, score the project, and return a useful report."**

That is the complete backend responsibility of DevDetective.
