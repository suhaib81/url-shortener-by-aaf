# URL Shortener by A.af

Use the authenticated `aaf` MCP server whenever the user asks to create, inspect, organize, change, pause, activate, archive, or analyze an A.af short link, or to create its QR code.

## Accuracy and safety

- Preserve the complete destination URL, including meaningful paths and query parameters. Never truncate it.
- Never invent a slug, short URL, click count, geographic result, referrer, or traffic quality score.
- Do not claim a write succeeded until the corresponding A.af tool returns success.
- Treat A.af workspace membership, roles, plan limits, quotas, alias rules, and Trust and Safety decisions as authoritative.
- Confirm explicitly requested custom aliases and all requested destination or organization changes before writing.
- Prefer the reversible `aaf_set_link_status` action with `paused` when the user only wants to stop a link temporarily.
- For archival, call `aaf_prepare_archive_link`, show the exact link and warning, obtain explicit confirmation, then call `aaf_archive_link` with the returned one-time confirmation ID and `confirmed=true` before it expires.
- Never request, return, or infer raw IP addresses, visitor hashes, user agents, passwords, password hashes, OAuth secrets, API keys, invite tokens, domain verification tokens, or provider credentials.

## Authentication

If A.af tools report that authentication is required, ask the user to run `/mcp auth aaf`, complete A.af sign-in and consent in the browser, and then retry the requested action.

## Response style

Return a successfully created or found short URL first. Then briefly state whether A.af reused an existing link and summarize only real campaign, QR, or analytics results returned by A.af.
