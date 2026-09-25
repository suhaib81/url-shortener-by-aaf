# URL Shortener by A.af for GitHub Copilot

This [Agent Plugins 1.0](https://agent-plugins.org/) package connects GitHub Copilot to the authenticated A.af MCP server. It contains a portable A.af skill and a Streamable HTTP MCP configuration; it contains no account credentials. A.af enforces workspace permissions, plan limits, URL safety, and audit rules on the server.

## Install

From GitHub Copilot CLI:

```bash
copilot plugin install suhaib81/url-shortener-by-aaf:github-copilot
copilot plugin list
```

On first use, authorize the `aaf` MCP server through A.af's browser-based OAuth flow. Inspect the connection with `copilot mcp list` and the skill with `copilot skill list`. GitHub Copilot access and A.af access are separate; users need both accounts. Never paste an A.af API key into this plugin.

This package targets interactive GitHub Copilot CLI sessions (and clients that use its MCP configuration). A GitHub organization may disable third-party MCP servers through its Copilot policy; if Copilot reports that the `aaf` server is blocked, an organization administrator must review that policy. The plugin cannot override it. GitHub Copilot cloud agent and code review do not currently support OAuth for remote MCP servers, so this OAuth-based connection is not available in those modes.

GitHub Copilot CLI currently warns that direct repository and local-path installs are deprecated. The long-term public installation route is a reviewed marketplace listing. The repository-root `plugin.json` belongs to Google Antigravity; the Copilot package starts in this directory, not at the repository root.

## Try it

Ask Copilot: `Create an A.af short link for https://example.com/launch?utm_source=copilot and give me the real short URL.` A.af may return an existing link under its duplicate rules. Creation requires explicit user action and can be declined by workspace permissions, plan limits, or Trust and Safety checks.

For local development, run `copilot plugin install ./github-copilot` from the repository root, then `npm run test:github-copilot`. Reinstall the local plugin after changing its files because Copilot caches installed components. The package was loaded by Copilot CLI 1.0.88 on Windows; live OAuth and A.af tool calls still need an interactive account test.

## Distribution

The GitHub repository subdirectory supports direct installation. Public discovery through Awesome Copilot requires its separate external-plugin review. A GitHub repository and working local install do not imply marketplace acceptance or listing.
