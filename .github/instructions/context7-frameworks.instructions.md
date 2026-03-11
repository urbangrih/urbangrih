---
description: "Use when working with frameworks or third-party libraries (React, Vite, routing, charting, state management, etc.) in this repository. Require Context7 MCP lookup before implementation details are proposed or changed."
name: "Context7 For Frameworks"
applyTo: "**"
---
# Context7 Requirement for Framework and Library Work

- Before writing or changing code that uses a framework or third-party library, resolve the library ID with Context7 and fetch docs for the exact feature.
- Prefer the library and version used by this project when that information is available (for example from `package.json`).
- Base API usage and examples on fetched docs instead of memory.
- This is a best-effort rule: if Context7 cannot provide a useful match, state that clearly and then use official docs or established in-repo patterns.
- In responses, briefly cite what was checked in Context7 (library ID and topic).
