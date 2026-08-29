---
name: mariadb-node-problems
description: Reproduce problems with sticky connections using mariadb node connector
author: BePo65
lastUpdated: "2026-08-29"
---

# Mariadb-Node-Problems

## Project Overview

This project creates a minimal test for reproducing problems with connections in node using the mariadb node connector. It is used to track down errors with getting new connections from a pool. After some database activities there is no new connection available, although all activities return the connections to the pool, when they are finished,

## Tech Stack

Main technologies and tools used in the project:

- **Backend**: nodejs, javascript, mariadb node connector.
- **Database**: running on docker using mariadb:12.3.2-ubi10 docker image.

## Project Structure

```
test-sharp/
├── src/
│   ├── controller.js
│   └── ...
├── test/
│   ├── test.1.spec.js
│   ├── test.2.spec.js
│   └── ...
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
├── package.json
└── README.md
```

## Development Guidelines

### Code Style

- Use consistent code formatting tools
- Follow language-specific best practices
- Keep code clean and readable

### Git Workflow

- Branch naming conventions: <type>/<short-description-of-changes>
- Commit message format: <type>: <message>

### Guidelines

1. **Keep it modular and simple.**

   * Small, focused functions/files; minimal deps; readability first. Leave room for future expansion.

2. **Preserve existing functionality.**

   * Modify only when directed; additive or reparative work.
   * Guard against regressions; validate existing behavior.
   * Lean on regression tests to prevent drift; extend coverage for critical paths.

3. **Observable.**

   * Update build/version in the package.json file and keep it in sync with release metadata.

4. **Refine in passes.**

   * Multiple passes for quality/readability; flag non-standard patterns and suggest standardization/accessibility for AI readability.

5. **Maintain documentation and context.**

   * Each file starts with a short overview.
   * Keep `README.md`, nested `AGENTS.md`, and `TODO/notes.md` current.
    * **At any point, I should be able to start a new AI conversation and not lose context.**

6. **Ask questions early.**

   * Don't guess; request clarification early.

7. **Plan first, code second.**

   * Outline steps and confirm before coding.

8. **Limit sprawl and keep commits focused.**

   * Keep commits atomic and on-topic.

9. **Use red / green test-driven development.**

    * Write and run tests *before* coding; ensure coverage for new changes. Protect new features with thorough regression tests and add any other type of tests necessary for stable, production deployments.

10. **Use AI-readable structure.**

    * Clear directories, consistent naming, and Markdown/YAML configs.

---


## Environment Setup

### Development Requirements

- Node.js version: 24.19.0
- Package manager: npm
- Other dependencies: mariadb

## Changelog

### v1.0.0 (2026-07-06)

- Initial release
- Implemented basic features
