import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function read(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8')
}

const manifestText = await read('gemini-extension.json')
const manifest = JSON.parse(manifestText)
const context = await read('GEMINI.md')

assert.equal(manifest.name, 'url-shortener-by-aaf')
assert.match(manifest.version, /^\d+\.\d+\.\d+$/)
assert.ok(manifest.description.length >= 20)
assert.equal(manifest.contextFileName, 'GEMINI.md')
assert.equal(manifest.mcpServers?.aaf?.httpUrl, 'https://a.af/mcp')
assert.equal(manifest.mcpServers?.aaf?.timeout, 30000)
assert.match(context, /Never truncate it/)
assert.match(context, /\/mcp auth aaf/)
assert.match(context, /explicit confirmation/)

const commandsRoot = path.join(root, 'commands', 'aaf')
const commandFiles = (await readdir(commandsRoot)).filter((file) => file.endsWith('.toml'))
assert.deepEqual(commandFiles.sort(), ['analytics.toml', 'links.toml', 'qr.toml', 'shorten.toml'])

const publicContent = [manifestText, context]
for (const commandFile of commandFiles) {
  const command = await read(path.join('commands', 'aaf', commandFile))
  assert.match(command, /^description\s*=\s*".+"/m)
  assert.match(command, /^prompt\s*=\s*"""/m)
  assert.doesNotMatch(command, /!\{/)
  publicContent.push(command)
}

assert.doesNotMatch(
  publicContent.join('\n'),
  /SUPABASE_SERVICE_ROLE_KEY|BREVO_API_KEY|PADDLE_API_KEY|client_secret|authorization:\s*bearer/i,
)

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

console.log('Google Gemini CLI extension verification passed.')
