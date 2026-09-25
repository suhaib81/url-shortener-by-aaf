import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const plugin = JSON.parse(readFileSync(resolve(root, '.cursor-plugin/plugin.json'), 'utf8'))
const mcp = JSON.parse(readFileSync(resolve(root, 'mcp.json'), 'utf8'))

assert.equal(plugin.name, 'url-shortener-by-aaf')
assert.equal(plugin.displayName, 'URL Shortener by A.af')
assert.equal(plugin.repository, 'https://github.com/suhaib81/url-shortener-by-aaf')
assert.equal(plugin.skills, './skills/')
assert.equal(plugin.mcpServers, './mcp.json')
assert(existsSync(resolve(root, plugin.logo)), 'Cursor logo is missing')
assert(existsSync(resolve(root, 'skills/aaf-links/SKILL.md')), 'A.af skill is missing')
assert.deepEqual(Object.keys(mcp.mcpServers), ['aaf'])
assert.deepEqual(mcp.mcpServers.aaf, { url: 'https://a.af/mcp' })

console.log('Cursor plugin package validated. Live Cursor OAuth still requires an interactive installation test.')
