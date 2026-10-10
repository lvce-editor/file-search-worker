import { cp, readFile, readdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { root } from './root.js'

const require = createRequire(join(root, 'packages', 'server', 'package.json'))
const { exportStatic } = require('@lvce-editor/shared-process')

process.env.PATH_PREFIX = '/file-search-worker'
const { commitHash } = await exportStatic({ root, extensionPath: '' })
const workerDist = join(root, 'dist', commitHash, 'packages', 'file-search-worker', 'dist')
await cp(join(root, '.tmp', 'dist', 'dist'), workerDist, { recursive: true })

const rendererDist = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist')
let found = false
for (const file of await readdir(rendererDist)) {
  if (!file.endsWith('.js')) {
    continue
  }
  const path = join(rendererDist, file)
  const content = await readFile(path, 'utf8')
  if (!content.includes('const fileSearchWorkerUrl = ')) {
    continue
  }
  const replacement = 'const fileSearchWorkerUrl = `${assetDir}/packages/file-search-worker/dist/fileSearchWorkerMain.js`;'
  await writeFile(path, content.replace(/^const fileSearchWorkerUrl = .*$/m, replacement))
  found = true
}
if (!found) {
  throw new Error('File search worker URL not found in exported renderer chunks')
}
await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
