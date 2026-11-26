# Recipe: Set up the GameNight local development environment

> **Written by:** Dragos · **Worked example:** PR pending · **Replicated by:** Pending

**Use this when:** Setting up the GameNight development environment on a new Windows machine. macOS-specific instructions can be added after verification.

**Takes about:** 30–60 minutes, excluding downloads.

---

## Before you start

- **You should already know:** Basic Git commands and how to use a terminal.
- **Required tools:** Git, Node.js, npm, VS Code, Docker Desktop, and WSL 2 (Windows).
- **Required versions:** Node.js 26.4.0 and npm 11.17.0, as specified in `package.json`.
- **Have running:** Docker Desktop before starting Supabase.

## Steps

### 1. Clone the repository

```bash
git clone https://github.com/Attackeler/gamenight-teo-denis.git
cd gamenight-teo-denis
```

### 2. Install project dependencies

```bash
npm install
```

### 3. Start the local Supabase backend

Make sure Docker Desktop is running.

```bash
npx supabase start
```

Supabase automatically downloads the required Docker images and starts its local services.

### 4. Configure environment variables

Copy `.env.example` to `.env.local`.

Run:

```bash
npx supabase status
```

Use the local API URL and publishable/anon key to configure:

```dotenv
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_KEY=<local publishable or anon key>
```

Do not commit `.env.local` or use secret/service-role keys in the Expo application.

### 5. Start the application

```bash
npx expo start
```

Press `w` to open GameNight in the browser.

## Check it worked

- Docker Desktop is running.
- Supabase displays `Started supabase local development setup`.
- Supabase Studio is accessible at `http://127.0.0.1:54323`.
- Expo starts and the application loads in the browser.

Run the project checks:

```bash
npm run lint
npm run prettier:check
npm run ts-check
```

On Windows PowerShell, `npm.cmd` can be used instead of `npm`.

All checks should pass. If any check fails, investigate before merging the PR.

## Gotchas

### 1. EBADENGINE – incompatible Node.js and npm versions

**Problem:** `npm install` failed with `EBADENGINE`.

**Cause:** The installed Node.js and npm versions did not match the versions required by the project.

**Solution:** Install Volta and configure the required versions:

```bash
volta install node@26.4.0
volta install npm@11.17.0
```

Verify:

```bash
node -v
npm -v
```

Do not disable `engine-strict` to bypass the version requirements.

### 2. Docker Engine unavailable on Windows

**Problem:** `npx supabase start` failed because it could not connect to Docker Engine.

**Cause:** Docker Desktop was not running or WSL 2 was not configured.

**Solution:**

1. Install Docker Desktop.
2. Install or enable WSL 2 using PowerShell as Administrator:

```powershell
wsl --install
```

3. Restart Windows if required.
4. Start Docker Desktop.
5. Verify the Docker connection:

```bash
docker info
```

Both `Client` and `Server` information should be displayed.

Retry:

```bash
npx supabase start
```

## Changelog

- 2026-11-26 — Dragos — Initial Windows setup recipe and troubleshooting notes.
