# URL Shortener by A.af for Microsoft 365 Copilot

This package creates a Microsoft 365 declarative agent backed by the production A.af remote MCP server. Users authenticate with A.af through OAuth and keep the same workspaces, roles, plan limits, URL validation, Trust and Safety controls, analytics privacy, and audit trail used by the A.af web application.

## Supported surfaces

After Microsoft validation and administrator enablement, the agent can appear in Microsoft 365 Copilot's Agent Store and across supported Microsoft 365 hosts such as Teams, Outlook, Word, Excel, and PowerPoint.

## Architecture

- Microsoft 365 app manifest: `appPackage/manifest.json`
- Declarative agent definition: `appPackage/declarativeAgent.json`
- MCP plugin manifest: `appPackage/ai-plugin.json`
- Pinned MCP tool definitions: 13 production tools mirrored from A.af's server contract so Microsoft package validation remains deterministic
- Agent safety and response instructions: `appPackage/instruction.txt`
- Production MCP endpoint: `https://a.af/mcp`
- OAuth discovery: `https://a.af/.well-known/oauth-authorization-server`
- OAuth registration: Dynamic Client Registration through Microsoft Enterprise token storage

No A.af, Supabase, or Microsoft secret is stored in this repository or in the app package.

## Verify the source package

From the repository root:

```bash
npm test
```

The test validates the manifests, branding asset dimensions, absence of secrets, live OAuth metadata, protected-resource metadata, and the unauthenticated MCP challenge.

## Provision for a Microsoft 365 development tenant

Install or invoke Microsoft 365 Agents Toolkit CLI, sign in with the publisher's Microsoft 365 developer account, then run from this directory:

```bash
npx -y --package @microsoft/m365agentstoolkit-cli atk provision --env dev --interactive false
```

Provisioning creates the Teams/Microsoft 365 app registration and the OAuth configuration in Microsoft's Enterprise token store, validates the package, and makes the agent available for tenant testing. Generated IDs and local credentials remain ignored by Git.

## Validate and package

After provisioning:

```bash
npx -y --package @microsoft/m365agentstoolkit-cli atk validate --env dev
npx -y --package @microsoft/m365agentstoolkit-cli atk package --env dev
```

For public distribution, submit the validated package through Microsoft Partner Center under **Apps and agents for Microsoft 365 and Copilot**. Microsoft certification and publisher-account verification are external requirements and are not represented as completed by this repository.
