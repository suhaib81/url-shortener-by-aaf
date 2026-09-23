# URL Shortener by A.af for Claude

This Claude plugin connects Claude Code to the production A.af remote MCP server. It uses the same authenticated A.af workspaces, permissions, plan limits, URL validation, duplicate handling, Trust and Safety checks, analytics privacy controls, and audit trail as the web application.

## Capabilities

- Create secure A.af short links without truncating destination URLs or query parameters.
- List and inspect authorized workspace links.
- Update destinations and organization fields after confirmation.
- Pause or activate links, and archive only through A.af's one-time confirmation flow.
- Generate QR codes.
- Read real privacy-safe link and campaign analytics.
- List campaigns and active custom domains allowed by the user's workspace role and plan.

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

## Example prompts

- `Create an A.af short link for https://example.com/launch?utm_source=claude.`
- `List the active links in my A.af workspace.`
- `Pause this A.af link, but do not archive it.`
- `Show the last 30 days of real analytics for this A.af link.`
- `Generate a standard QR code for this A.af link.`

## Security

- The plugin contains no A.af, Supabase, or Anthropic credentials.
- OAuth occurs between the user, Claude, and A.af at `https://a.af/mcp`.
- A.af enforces membership and role checks server-side.
- Raw IP addresses, password hashes, OAuth secrets, invite tokens, and private visitor identifiers are never returned.
- Archival requires a separate short-lived confirmation tied to the exact user, workspace, client, link, and action.

## Support

- Connection guide: https://a.af/developers/ai-connectors
- Privacy: https://a.af/privacy
- Support: https://a.af/contact
