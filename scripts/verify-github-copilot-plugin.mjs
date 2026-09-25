import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const read = (path) => readFile(resolve(root, path), 'utf8')
const plugin = JSON.parse(await read('github-copilot/plugin.json'))
const mcp = JSON.parse(await read('github-copilot/mcp.json'))
const skill = await read('github-copilot/skills/aaf-links/SKILL.md')
const sourceSkill = await read('skills/aaf-links/SKILL.md')
const antigravity = JSON.parse(await read('plugin.json'))

assert.equal(plugin.$schema, 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json')
assert.equal(plugin.name, 'url-shortener-by-aaf')
assert.match(plugin.version, /^\d+\.\d+\.\d+$/)
assert.equal(plugin.repository, 'https://github.com/suhaib81/url-shortener-by-aaf')
assert.equal(plugin.license, 'MIT')
assert.deepEqual(Object.keys(plugin).sort(), [
  '$schema', 'author', 'description', 'homepage', 'keywords', 'license', 'name', 'repository', 'version',
].sort())
assert.equal(mcp.$schema, 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json')
assert.deepEqual(Object.keys(mcp).sort(), ['$schema', 'mcpServers'].sort())
assert.deepEqual(mcp.mcpServers, {
  aaf: { type: 'streamable-http', url: 'https://a.af/mcp' },
})
assert.equal(skill, sourceSkill, 'Copilot skill must stay in sync with the shared A.af skill')
assert.equal(antigravity.$schema, 'https://antigravity.google/schemas/v1/plugin.json')
assert.doesNotMatch(JSON.stringify({ plugin, mcp }), /clientSecret|accessToken|apiKey|Bearer\s+\S+/i)

console.log('GitHub Copilot plugin package validated. Live Copilot OAuth and tool use require client testing.')
