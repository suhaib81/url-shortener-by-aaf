import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const manifest = JSON.parse(await readFile(new URL('../google-workspace/deployment.json', import.meta.url), 'utf8'))
const docs = await readFile(new URL('../google-workspace/README.md', import.meta.url), 'utf8')
const listing = await readFile(new URL('../google-workspace/store-listing.md', import.meta.url), 'utf8')
const icon32 = await readFile(new URL('../google-workspace/assets/icon-32.png', import.meta.url))
const icon128 = await readFile(new URL('../google-workspace/assets/icon-128.png', import.meta.url))
const banner = await readFile(new URL('../google-workspace/assets/banner-220x140.png', import.meta.url))

assert.equal(manifest.addOns.common.name, 'URL Shortener by A.af')
assert.equal(manifest.addOns.common.homepageTrigger.runFunction, 'https://a.af/api/google-workspace/addon')
assert.equal(manifest.addOns.httpOptions.authorizationHeader, 'SYSTEM_ID_TOKEN')
assert.equal(manifest.addOns.httpOptions.granularOauthPermissionSupport, 'OPT_IN')
assert.deepEqual(manifest.oauthScopes, [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/drive.file',
])
for (const host of ['gmail', 'calendar', 'drive', 'docs', 'sheets', 'slides']) {
  assert.ok(Object.hasOwn(manifest.addOns, host), `Missing host: ${host}`)
}
for (const host of ['docs', 'sheets', 'slides']) {
  assert.equal(manifest.addOns[host].onFileScopeGrantedTrigger.runFunction, manifest.addOns.common.homepageTrigger.runFunction)
}
assert.ok(manifest.addOns.common.openLinkUrlPrefixes.every((url) => url.startsWith('https://a.af/')))
assert.match(docs, /contains no API keys or user credentials/i)
assert.match(listing, /Privacy Policy/)
assert.match(listing, /Google Docs™/)
assert.match(listing, /trademarks of Google LLC/)
assert.doesNotMatch(JSON.stringify(manifest), /(api[_-]?key|secret|token)\s*[:=]\s*["'][^"']+/i)
const dimensions = (png) => [png.readUInt32BE(16), png.readUInt32BE(20)]
assert.deepEqual(dimensions(icon32), [32, 32])
assert.deepEqual(dimensions(icon128), [128, 128])
assert.deepEqual(dimensions(banner), [220, 140])

console.log('Google Workspace deployment manifest verification passed.')
