import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const nodeModulesPath = join(root, 'packages', 'server', 'node_modules')

const workerPath = join(root, 'dist', 'dist', 'fileSearchWorkerMain.js')

const serverPath = join(nodeModulesPath, '@lvce-editor', 'static-server')
const staticPath = join(serverPath, 'static')
const indexHtmlPath = join(staticPath, 'index.html')

const indexHtmlContent = await readFile(indexHtmlPath, 'utf8')

const remoteUrl = getRemoteUrl(workerPath)

const config = {
  'develop.fileSearchWorkerPath': remoteUrl,
}
const stringifiedConfig = JSON.stringify(config, null, 2)
const newContent = indexHtmlContent.replace(
  '</title>',
  `</title>
  <script type="application/json" id="Config">${stringifiedConfig}</script>`,
)

await writeFile(indexHtmlPath, newContent)
