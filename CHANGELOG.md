# Changelog

All notable changes to the Verfix product will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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