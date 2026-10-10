import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const fileSearchWorkerPath = join(root, '.tmp', 'dist', 'dist', 'fileSearchWorkerMain.js')
const staticServerPackagePath = fileURLToPath(new URL('.', import.meta.resolve('@lvce-editor/static-server/package.json')))
const serverStaticPath = join(staticServerPackagePath, 'static')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerDistPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist')
const remoteUrl = getRemoteUrl(fileSearchWorkerPath)
let found = false
for (const file of await readdir(rendererWorkerDistPath)) {
  if (!file.endsWith('.js')) {
    continue
  }
  const path = join(rendererWorkerDistPath, file)
  const content = await readFile(path, 'utf8')
  if (!content.includes('const fileSearchWorkerUrl = ')) {
    continue
  }
  await writeFile(path, content.replace(/^const fileSearchWorkerUrl = .*$/m, `const fileSearchWorkerUrl = ${JSON.stringify(remoteUrl)};`))
  found = true
}
if (!found) {
  throw new Error('File search worker URL not found in renderer chunks')
}
