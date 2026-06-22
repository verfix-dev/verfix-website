# Changelog

All notable changes to the Verfix product will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.9] - 2026-06-22

### Fixed
- Minor bug fixes and documentation updates.

## [0.2.8] - 2026-06-22

### Added
- **Hybrid Browser Mode (Host/Container):** Introduced a dual browser execution model with two modes: `host` (default on macOS/Windows) runs Playwright workers directly on the host machine with native localhost access, while `container` (default on Linux) keeps workers inside Docker with `--network=host`. Users can override via `VERFIX_BROWSER_MODE=host|container`.
  - Hybrid mode solves localhost networking issues on macOS/Windows where Docker containers cannot reach host services without a proxy.
  - On container start, the CLI automatically extracts worker files from the Docker image, installs Playwright Chromium locally, and spawns a dedicated local worker process.
  - New `--show-browser` flag on `verfix start` and `verfix run` enables visible browser window for debugging (headful mode).
- **Slim Server Image (`verfix-server-slim`):** A new lightweight Docker image built on SQLite (no PostgreSQL dependency) that CLI automatically selects when running in host browser mode on macOS/Windows, reducing resource overhead.
- **Pluggable Database Backend:** Refactored the Go API to a `Store` interface with two implementations — PostgreSQL (full image, existing behavior) and SQLite (slim image, embedded). This decouples the API from a specific database driver.
- **Local Worker Lifecycle Management:** The CLI now manages local worker processes with proper PID tracking, auto-detection of stale workers, headful/headless mode switching, graceful shutdown (`verfix stop`), and artifact directory bind-mounting for shared access between host workers and the container.
- **Update Checker Browser-Mode Awareness:** The NPM and Docker image update-checker now queries the correct image tag based on the active browser mode (slim vs. full image).

### Fixed
- **Localhost Networking on macOS/Windows:** Replaced the previous CLI TCP proxy approach with hybrid browser mode, providing a more robust and maintainable solution to Docker networking restrictions.
- **Port Conflicts on Host Redis Detection:** The CLI now detects if Redis is already running on the host at port 6379 before mapping container ports, preventing "port is already allocated" errors.

## [0.2.7] - 2026-06-20

### Added
- **Anonymous Telemetry & Analytics:** Integrated privacy-first telemetry with PostHog to track usage metrics for CLI initialization, diagnostic checking, container startups, and verification runs.
  - Automatically respects standard `DO_NOT_TRACK` and `VERFIX_TELEMETRY=off` environment variables.
  - Uses an anonymous tracking identifier generated once and stored in `~/.verfix/.machine-id` (no PII, hostname, or system paths collected).
  - Shows a clear, transparent, one-time privacy notice on the first execution.
  - Telemetry works completely asynchronously on lazy-loaded paths, ensuring zero execution block.
- **Telemetry Documentation:** Added a comprehensive Telemetry & Privacy developer documentation guide.

## [0.2.6] - 2026-06-20

### Added
- **Non-Interactive Setup Wizard Mode (`--yes` / `-y`):** Added support to `verfix init` for unattended execution using flags or environment variables. Particularly useful for automated environments, CI/CD pipelines, and AI coding agents.
- **Provider Auto-Detection:** Automatically detect AI providers (OpenAI, Anthropic, Gemini, OpenRouter) based on the format of the provided API key.
- **Agent Setup Command (`verfix agent-setup`):** A new command outputting machine-readable JSON instructions for AI coding agents to bootstrap Verfix.
- **Graceful Docker Degradation:** Init wizard will warn and continue configuring if Docker is not installed or running, instead of hard failing.
- **Dry-run Mode (`--dry-run`):** Validate settings and preview the generated configurations as JSON without writing files.

## [0.2.5] - 2026-06-16

### Added
- **CLI Local Proxy:** Added transparent TCP proxy for Docker networking on Windows/macOS. Automatically starts a proxy on the host machine when targeting `localhost` or `127.0.0.1` from inside Docker containers.

### Fixed
- **Docker Networking (Windows):** Fixed connection issues when running verification jobs against localhost services on Windows and macOS. The CLI now spawns a local proxy that forwards traffic from the container to the host machine, bypassing Windows Firewall and IPv6 binding restrictions that previously caused `ERR_CONNECTION_REFUSED` errors.
- **Worker Connection Errors:** Improved error messages for connection failures in workers to clearly indicate when host server connectivity issues occur.

## [0.2.2] - 2026-06-14

### Added
- **CLI Update Notifications:** Added industry-standard update notification system for both the CLI npm package and the Docker server image.
  - `verfix start` and `verfix status` now show update banners when a newer version is available.
  - Checks run in a fully detached background process so commands remain instant — zero blocking I/O.
  - NPM version check queries `registry.npmjs.org` and caches the result for 24 hours.
  - Docker image digest check compares local and remote GHCR digests without pulling the image.

### Changed
- Redesigned the dashboard workspace with a calmer Postman-inspired shell, compact execution history, responsive split panels, and shared light/dark theme tokens.
- Improved dashboard controls with keyboard-focus styling, ARIA labels, selectable history rows, and clearer new-verification validation feedback.
- **Flaky Task Display:** Changed from URL-level to execution-level granularity. Backend `handleFlaky` now returns `failed_execution_ids` so the frontend can mark only the specific failed executions as flaky. Sidebar flaky tag and detail-view diagnostics now only appear on executions that actually failed.

### Fixed
- **Docker Build:** Fixed dashboard build failure caused by `.dockerignore` excluding the `cli/` directory.
- **Database Performance:** Added composite index `idx_executions_url_status_passed` on `(url, status, passed)` to speed up flaky URL queries.
- **Database Reliability:** Added `defer idRows.Close()` in `handleFlaky` to prevent resource leaks on early returns.

## [0.2.1] - 2026-06-10

### Added
- **AI Agent Context File:** Added `.github/agents.md` containing coding standards, monorepo architecture, testing instructions, and critical networking guardrails for AI coding assistants.
- **2026 Model Support:** Updated static model lists for OpenAI (`gpt-5.4-mini`/`gpt-5.5`), Anthropic (`claude-sonnet-4-6`/`claude-opus-4-8`), and Gemini (`gemini-3.5-flash`/`gemini-3.5-pro`), and added support for the new Gemini `AQ` key prefix.

## [0.2.0] - 2026-06-10

### Added
- **Multi-provider AI Support:** Implemented custom HTTP-based adapters in the AI runtime to support OpenAI, Anthropic, Gemini, and OpenRouter, completely eliminating the external `openai` SDK dependency.
- **API Key Connectivity Testing:** Added an interactive connectivity test step for AI API keys during the `verfix init` setup wizard.
- **Config Migration & Validation:** Added schema validation and automated configuration migration support for legacy configurations.

### Changed
- Improved Docker networking resolving logic in CLI and workers to handle platform-specific URLs (`host.docker.internal` vs. host networking) across multiple AI providers.

## [0.1.5] - 2026-06-07

### Added
- Programmatic SDK for integration scenarios with class-based API.
- Platform-specific agent rules configuration support.
- Flow composability features for building complex verification workflows.
- Clean JSON output mode for CLI enabling machine-readable output.
- Exit code contracts for CLI commands providing predictable return values.
- Agent platform integration support for expanded extensibility.

### Changed
- SDK upgraded to class-based API for improved ergonomics and type safety.
- `verfix init` no longer scaffolds empty flows — replaced with `verfix create flow <name>` for on-demand flow creation.

### Fixed
- Improved image capturing system to save disk space in execution artifacts.

## [0.1.4] - 2026-05-25

### Added
- Introduced runtime port management with new defaults: Dashboard `3610`, API `3611`.
- Added automatic port-pair fallback when defaults are occupied (`3612/3613`, `3614/3615`, ...).
- Added runtime port persistence in `.verfix/runtime.json`.
- Added container-to-CLI runtime port sync so CLI reflects actual running container ports.

### Changed
- Updated CLI commands (`start`, `status`, `run`, `list`, `doctor`, `init`) to use shared runtime-resolved ports.
- Updated dashboard API endpoint resolution to derive API base dynamically from dashboard origin.
- Updated runtime defaults and documentation references from `3000/3001` to `3610/3611`.

### Fixed
- Fixed `verfix init` app-port auto-detection incorrectly selecting runtime/API ports as the user's app port.
- Fixed repeated `init`/`start` workflows to behave idempotently without stale port output.
- Fixed stale API port behavior by adding API health-based fallback discovery (including legacy `3001`) and self-healing runtime port persistence.