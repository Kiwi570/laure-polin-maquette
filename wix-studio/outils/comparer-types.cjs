// Compare les types immuables (dataType, elementType, cssPropertyType) d'un manifeste construit
// (packages/site-code/dist/_wix/app-manifest.json, après `wix build && wix generate manifest && wix build`)
// avec ceux du brouillon de l'application compagnon chez Wix. À lancer avant CHAQUE import :
// un seul écart et Wix refuse la fusion (HTTP 500 « could not be merged into the app draft »).
//
// brouillon.json : réponse de
//   POST https://manage.wix.com/_api/apps-runtime-reader/v1/app-runtime-data
//   { "appRuntimeKeys": [{ "appId": "34aae9b7-ecbb-4c09-9832-6a04eb42271d", "version": "latest" }] }
// (lecture seule, authentifiée par le site).
// Usage : node comparer-types.cjs brouillon.json app-manifest.json
const fs = require('fs')
const [, , fBrouillon, fManifeste] = process.argv
if (!fBrouillon || !fManifeste) { console.error('usage : node comparer-types.cjs brouillon.json app-manifest.json'); process.exit(2) }

const typesOf = (ee) => {
  const out = {}
  const walk = (o, p) => {
    if (!o || typeof o !== 'object') return
    for (const k of ['dataType', 'elementType', 'cssPropertyType']) if (typeof o[k] === 'string') out[`${p}#${k}`] = o[k]
    for (const [k, v] of Object.entries(o)) if (v && typeof v === 'object' && k !== 'defaultValue') walk(v, p ? `${p}.${k}` : k)
  }
  walk(ee, '')
  return out
}

const b = JSON.parse(fs.readFileSync(fBrouillon, 'utf8'))
const ard = (b.appsRuntimeData || [])[0] || b.appRuntimeData || {}
const brouillon = {}
for (const c of ard.components || []) {
  const erc = c.data && c.data.editorReactComponent
  if (erc) brouillon[erc.type] = typesOf(erc.editorElement || {})
}
const m = JSON.parse(fs.readFileSync(fManifeste, 'utf8'))
const ecarts = []
for (const c of m.components || []) {
  const erc = c.compData && c.compData.editorReactComponent
  if (!erc) continue
  const t = typesOf(erc.editorElement || {})
  const avant = brouillon[erc.type] || {}
  for (const [p, v] of Object.entries(t)) if (p in avant && avant[p] !== v) ecarts.push(`${erc.type} ${p} : ${avant[p]} -> ${v}`)
}
console.log(JSON.stringify({ composants: (m.components || []).length, ecartsDeType: ecarts }, null, 1))
process.exit(ecarts.length ? 1 : 0)
