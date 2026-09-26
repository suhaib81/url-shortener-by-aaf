import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const read = (path) => readFile(resolve(root, path), 'utf8')
const plugin = JSON.parse(await read('kimi/kimi.plugin.json'))
const skill = await read('kimi/skills/aaf-links/SKILL.md')
const antigravity = JSON.parse(await read('plugin.json'))

assert.equal(plugin.name, 'url-shortener-by-aaf')
assert.match(plugin.version, /^\d+\.\d+\.\d+$/)
assert.equal(plugin.interface.displayName, 'URL Shortener by A.af')
assert.equal(plugin.interface.category, 'PRODUCTIVITY')
assert.equal(plugin.interface.tryPrompts.length, 3)
assert.equal(plugin.skills, './skills/')
assert.deepEqual(plugin.mcpServers, { aaf: { url: 'https://a.af/mcp' } })
assert.equal(antigravity.$schema, 'https://antigravity.google/schemas/v1/plugin.json')
assert.match(skill, /^---\r?\nname: aaf-links\r?\n/)
for (const tool of [
  'aaf_list_workspaces', 'aaf_create_short_link', 'aaf_get_link',
  'aaf_update_link', 'aaf_set_link_status', 'aaf_prepare_archive_link',
  'aaf_archive_link', 'aaf_get_link_analytics', 'aaf_create_qr_code',
]) assert.ok(skill.includes(tool), `Missing workflow guidance for ${tool}`)
assert.match(skill, /Never truncate a destination/)
assert.match(skill, /one-time confirmation/)
assert.doesNotMatch(JSON.stringify(plugin), /clientSecret|accessToken|apiKey|Bearer\s+\S+/i)

console.log('Kimi plugin package validated. Live OAuth and tool use require a signed-in Kimi account.')
