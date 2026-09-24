import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), 'utf8'))
}

const manifest = await readJson('plugin.json')
const mcpConfig = await readJson('mcp_config.json')
const skill = await readFile(path.join(root, 'skills', 'aaf-links', 'SKILL.md'), 'utf8')

assert.equal(manifest.$schema, 'https://antigravity.google/schemas/v1/plugin.json')
assert.equal(manifest.name, 'url-shortener-by-aaf')
assert.ok(manifest.description.length >= 20)
assert.deepEqual(Object.keys(manifest).sort(), ['$schema', 'description', 'name'])
assert.equal(mcpConfig.mcpServers?.aaf?.serverUrl, 'https://a.af/mcp')
assert.doesNotMatch(JSON.stringify(mcpConfig), /httpUrl|clientSecret|api[_-]?key/i)
assert.match(skill, /Never claim a link was created until the tool returns a successful A\.af short URL/)
assert.doesNotMatch(
  [JSON.stringify(manifest), JSON.stringify(mcpConfig), skill].join('\n'),
  /SUPABASE_SERVICE_ROLE_KEY|BREVO_API_KEY|PADDLE_API_KEY|authorization:\s*bearer/i,
)

const resourceMetadataResponse = await fetch('https://a.af/.well-known/oauth-protected-resource/mcp')
assert.equal(resourceMetadataResponse.status, 200)
const resourceMetadata = await resourceMetadataResponse.json()
assert.equal(resourceMetadata.resource, 'https://a.af/mcp')

const mcpResponse = await fetch('https://a.af/mcp')
assert.equal(mcpResponse.status, 401)
assert.match(mcpResponse.headers.get('www-authenticate') || '', /resource_metadata=/)

console.log('Google Antigravity plugin verification passed.')
