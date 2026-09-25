# URL Shortener by A.af

URL Shortener by A.af connects leading AI assistants to the production A.af remote MCP server. Every integration uses the same authenticated A.af workspaces, permissions, plan limits, URL validation, duplicate handling, Trust and Safety checks, analytics privacy controls, and audit trail as the web application.

## Platforms

- **OpenAI ChatGPT and Codex:** distributed as the approved URL Shortener by A.af plugin.
- **Claude:** packaged as a Claude Code plugin and submitted through Anthropic's plugin review flow.
- **Microsoft 365 Copilot:** packaged as a declarative agent with an authenticated remote MCP action in [`microsoft-copilot/`](microsoft-copilot/README.md).
- **Google Antigravity:** packaged as a native Antigravity plugin with OAuth, an A.af agent skill, and the production remote MCP server.
- **Google Gemini CLI:** retained as a native extension for supported enterprise and API-key users.
- **Cursor:** packaged as a Cursor plugin with the A.af skill and remote MCP server. Submitted for public Marketplace review on September 25, 2026; not yet listed.
- **GitHub Copilot:** packaged in [`github-copilot/`](github-copilot/README.md) as an Agent Plugins 1.0 skill plus authenticated remote MCP server. Direct installation is supported; public marketplace listing requires separate review.

## Capabilities

- Create secure A.af short links without truncating destination URLs or query parameters.
- List and inspect authorized workspace links.
- Update destinations and organization fields after confirmation.
- Pause or activate links, and archive only through A.af's one-time confirmation flow.
- Generate QR codes.
- Read real privacy-safe link and campaign analytics.
- List campaigns and active custom domains allowed by the user's workspace role and plan.

## Install in Cursor

The Cursor plugin lives in `.cursor-plugin/plugin.json` and uses the same production A.af MCP server. Install it locally from this repository using Cursor's local plugin import, then open Customize to verify that the `aaf-links` skill and `aaf` MCP server are present. Authenticate through A.af when Cursor prompts; do not paste an A.af API key into the plugin or source files.

For a direct MCP connection without the plugin, add this to your Cursor user-level `mcp.json`:

```json
{
  "mcpServers": {
    "aaf": { "url": "https://a.af/mcp" }
  }
}
```

Run `npm run test:cursor` to validate the package files. On September 25, 2026, the local Cursor installation completed A.af OAuth and successfully called the read-only `aaf_list_workspaces` tool; no link was created during this check. The public repository was submitted at `https://cursor.com/marketplace/publish` on the same date and awaits Cursor's review. Cursor reviewers should use `.cursor-plugin/plugin.json`; the root `plugin.json` is for Google Antigravity.

## Install in GitHub Copilot

The GitHub Copilot plugin is in [`github-copilot/`](github-copilot/README.md), separate from the repository-root Google Antigravity package:

```bash
copilot plugin install suhaib81/url-shortener-by-aaf:github-copilot
```

Sign in to GitHub Copilot, then authorize the A.af MCP server with your own A.af account when prompted. Run `npm run test:github-copilot` to validate the package structure. Copilot CLI warns that direct repository installs are deprecated; a public Awesome Copilot listing needs separate review and is not implied by direct install.

## License and branding

The connector source code, manifests, and documentation in this repository are available under the [MIT License](LICENSE). The A.af hosted service and its private source code are not part of this repository or license. A.af names, logos, icons, and other brand assets are excluded from the MIT grant and remain the owner's intellectual property; their inclusion here is solely for identifying the official connector.

## Test locally with Claude Code

From the A.af repository root:

```bash
claude plugin validate --strict ./plugins/url-shortener-by-aaf
claude --plugin-dir ./plugins/url-shortener-by-aaf
```

Claude will ask the user to enable the remote MCP server and authenticate with A.af. The plugin is intentionally not enabled by default because it connects to an external service and can perform account-scoped write actions.

The same server can be added without the plugin wrapper:

```bash
claude mcp add --transport http aaf https://a.af/mcp
```

Use `/mcp` in Claude Code to inspect the connection or restart OAuth.

## Test the Microsoft 365 Copilot package

```bash
npm test
```

See [`microsoft-copilot/README.md`](microsoft-copilot/README.md) for Microsoft 365 Agents Toolkit provisioning, validation, and Partner Center distribution steps.

## Install in Google Antigravity

Install the public plugin from GitHub:

```bash
agy plugin install https://github.com/suhaib81/url-shortener-by-aaf
```

The plugin loads the A.af skill and remote MCP server. Open the MCP manager with `/mcp`, authenticate the `aaf` server, sign in to A.af, and approve access to the intended workspace. Antigravity discovers OAuth through A.af dynamic client registration; the plugin contains no A.af API key.

For local development:

```bash
agy plugin install .
npm run test:antigravity
```

## Install in Google Gemini CLI

Install the public extension from GitHub:

```bash
gemini extensions install https://github.com/suhaib81/url-shortener-by-aaf
```

Restart Gemini CLI after installation. On first use, run `/mcp auth aaf`, sign in to A.af in the browser, and approve access to the selected workspace. No A.af API key is stored in the extension.

The extension adds these commands:

- `/aaf:shorten <destination URL and options>`
- `/aaf:links <list or lookup request>`
- `/aaf:analytics <link or campaign and date range>`
- `/aaf:qr <A.af link or destination URL>`

Validate the package and its live OAuth/MCP dependencies:

```bash
npm run test:gemini
npm run validate:gemini
```

For local development, use `gemini extensions link .`, restart Gemini CLI, and inspect the connection with `/mcp list`.

## Example prompts

- `Create an A.af short link for https://example.com/launch?utm_source=ai_assistant.`
- `List the active links in my A.af workspace.`
- `Pause this A.af link, but do not archive it.`
- `Show the last 30 days of real analytics for this A.af link.`
- `Generate a standard QR code for this A.af link.`

## Security

- The plugin contains no A.af, Supabase, or Anthropic credentials.
- OAuth occurs between the user, the supported AI platform, and A.af at `https://a.af/mcp`.
- A.af enforces membership and role checks server-side.
- Raw IP addresses, password hashes, OAuth secrets, invite tokens, and private visitor identifiers are never returned.
- Archival requires a separate short-lived confirmation tied to the exact user, workspace, client, link, and action.

## Support

- Connection guide: https://a.af/developers/ai-connectors
- Privacy: https://a.af/privacy
- Support: https://a.af/contact
