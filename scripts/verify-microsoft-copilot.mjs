import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const copilotRoot = path.join(root, 'microsoft-copilot')
const appPackage = path.join(copilotRoot, 'appPackage')

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(appPackage, relativePath), 'utf8'))
}

function pngDimensions(buffer) {
  assert.equal(buffer.toString('ascii', 1, 4), 'PNG', 'Asset must be a PNG file')
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

const manifest = await readJson('manifest.json')
const agent = await readJson('declarativeAgent.json')
const plugin = await readJson('ai-plugin.json')
const lifecycle = await readFile(path.join(copilotRoot, 'm365agents.yml'), 'utf8')
const instructions = await readFile(path.join(appPackage, 'instruction.txt'), 'utf8')

assert.equal(manifest.manifestVersion, '1.30')
assert.equal(agent.version, 'v1.8')
assert.equal(plugin.schema_version, 'v2.4')
assert.equal(manifest.name.short, 'URL Shortener by A.af')
assert.equal(agent.name, 'URL Shortener by A.af${{APP_NAME_SUFFIX}}')
assert.equal(agent.actions[0].file, 'ai-plugin.json')

const runtime = plugin.runtimes.find((entry) => entry.type === 'RemoteMCPServer')
assert.ok(runtime, 'Remote MCP runtime is required')
assert.equal(runtime.spec.url, 'https://a.af/mcp')
assert.equal(runtime.auth.type, 'OAuthPluginVault')
assert.equal(runtime.auth.reference_id, '${{MCP_DA_AUTH_ID_AAF}}')
const expectedTools = [
  'aaf_list_workspaces',
  'aaf_create_short_link',
  'aaf_list_links',
  'aaf_get_link',
  'aaf_update_link',
  'aaf_set_link_status',
  'aaf_prepare_archive_link',
  'aaf_archive_link',
  'aaf_get_link_analytics',
  'aaf_create_qr_code',
  'aaf_list_campaigns',
  'aaf_get_campaign_analytics',
  'aaf_list_custom_domains',
]
const functionNames = plugin.functions.map((entry) => entry.name)
const toolNames = runtime.spec.mcp_tool_description.tools.map((entry) => entry.name)
assert.deepEqual(functionNames, expectedTools)
assert.deepEqual(toolNames, expectedTools)
assert.deepEqual(runtime.run_for_functions, expectedTools)
assert.ok(runtime.spec.mcp_tool_description.tools.every((tool) => tool.inputSchema?.type === 'object'))

assert.match(lifecycle, /uses: dcr\/register/)
assert.match(lifecycle, /wellKnownAuthorizationServer: https:\/\/a\.af\/\.well-known\/oauth-authorization-server/)
assert.match(lifecycle, /applicableToApps: AnyApp/)
assert.match(instructions, /Do not invent[^\n]*click count/)
assert.match(instructions, /explicit confirmation/)

const color = pngDimensions(await readFile(path.join(appPackage, 'color.png')))
const outline = pngDimensions(await readFile(path.join(appPackage, 'outline.png')))
assert.deepEqual(color, { width: 192, height: 192 })
assert.deepEqual(outline, { width: 32, height: 32 })

const publicFiles = [
  JSON.stringify(manifest),
  JSON.stringify(agent),
  JSON.stringify(plugin),
  lifecycle,
  instructions,
].join('\n')
assert.doesNotMatch(publicFiles, /SUPABASE_SERVICE_ROLE_KEY|BREVO_API_KEY|PADDLE_API_KEY|client_secret/i)

const authorizationMetadataResponse = await fetch('https://a.af/.well-known/oauth-authorization-server')
assert.equal(authorizationMetadataResponse.status, 200)
const authorizationMetadata = await authorizationMetadataResponse.json()
assert.ok(authorizationMetadata.authorization_endpoint)
assert.ok(authorizationMetadata.token_endpoint)
assert.ok(authorizationMetadata.registration_endpoint)
assert.ok(authorizationMetadata.code_challenge_methods_supported?.includes('S256'))

const resourceMetadataResponse = await fetch('https://a.af/.well-known/oauth-protected-resource/mcp')
assert.equal(resourceMetadataResponse.status, 200)
const resourceMetadata = await resourceMetadataResponse.json()
assert.equal(resourceMetadata.resource, 'https://a.af/mcp')

const mcpResponse = await fetch('https://a.af/mcp')
assert.equal(mcpResponse.status, 401)
assert.match(mcpResponse.headers.get('www-authenticate') || '', /resource_metadata=/)

console.log('Microsoft 365 Copilot package verification passed.')
