# URL Shortener by A.af for Kimi

This English-language package connects Kimi to the production A.af MCP server. It targets Kimi's plugin experience and Kimi Code, not a China-only distribution channel. Users outside mainland China should sign in through `https://www.kimi.ai/`; Kimi redirects them there from its `kimi.com` login screen. The package contains no API key or user token.

The `assets/icon-128.png` file is the existing A.af logo for a marketplace upload, if Kimi requests one. The package ZIP is generated under the ignored `dist/` directory.

## Personal installation and test

In Kimi Work, use Plugin Builder to import the `kimi/` package, install it from **Plugins > Personal**, and connect your own A.af account when prompted. Confirm that the MCP service is `https://a.af/mcp` and that the requested permissions match the A.af consent screen. In Kimi Code, install this directory or its ZIP with `/plugins install <path-or-url>`, then start a new session or run `/reload`. If authorization is required, use `/mcp-config login aaf` and complete A.af OAuth in your browser.

For international users, test the personal plugin from a `kimi.ai` account before claiming global availability. Marketplace visibility may differ by region and Kimi surface.

Test a read-only request such as "List my A.af workspaces" before creating a link. Then create a harmless test link, confirm the returned URL resolves correctly, and check that it appears under the intended workspace. Repeat with an account that is not a member of that workspace to confirm access is denied. Test expired or canceled OAuth and reconnection before requesting a public listing.

## Public marketplace

Personal installation does not publish the plugin. After live testing, open its details in Kimi Work, select the feedback/envelope button, choose **Apply for official marketplace publication**, and provide a contact email. Kimi reviews the submission; public availability and geographic visibility are not automatic.

## Security

- Authentication is per A.af user through OAuth. Never put a shared A.af credential in this repository or a Kimi prompt.
- A.af enforces workspace membership, role permissions, link safety, and plan limits server-side.
- Analytics are privacy-safe aggregates; no raw IPs, tokens, or password hashes are exposed.
- Archiving requires an exact-link, one-time confirmation; pausing is reversible.

Support: https://a.af/contact
