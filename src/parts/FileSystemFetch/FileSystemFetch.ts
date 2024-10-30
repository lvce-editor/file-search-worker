import * as AssetDir from '../AssetDir/AssetDir.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as FileMapUrl from '../FileMapUrl/FileMapUrl.ts'
import * as GetJson from '../GetJson/GetJson.ts'
import * as GetText from '../GetText/GetText.ts'
import * as PathSeparatorType from '../PathSeparatorType/PathSeparatorType.ts'

// TODO move all of this to an extension

export const canBeRestored = true

export const name = 'Fetch'

export const state = {
  files: Object.create(null),
}

export const readFile = async (uri: string) => {
  const fetchUri = `${AssetDir.assetDir}${uri}`
  const text = await GetText.getText(fetchUri)
  return text
}

export const writeFile = (uri: string, content: string) => {
  throw new Error('not implemented')
}

export const mkdir = (uri: string) => {
  throw new Error('not implemented')
}

export const getPathSeparator = () => {
  return PathSeparatorType.Slash
}

export const remove = (uri: string) => {
  throw new Error('not implemented')
}

export const readDirWithFileTypes = async (uri: string) => {
  const fileList = await GetJson.getJson(FileMapUrl.fileMapUrl)
  const dirents: any[] = []
  for (const fileUri of fileList) {
    if (fileUri.startsWith(uri)) {
      const rest = fileUri.slice(uri.length + 1)
      if (rest.includes(PathSeparatorType.Slash)) {
        const name = rest.slice(0, rest.indexOf(PathSeparatorType.Slash))
        if (dirents.some((dirent) => dirent.name === name)) {
          continue
        }
        dirents.push({
          type: DirentType.Directory,
          name,
        })
      } else {
        dirents.push({
          type: DirentType.File,
          name: rest,
        })
      }
    }
  }
  return dirents
}

export const chmod = (path: string, permissions: any) => {
  throw new Error('[memfs] chmod not implemented')
}

export const getBlob = async (uri: string) => {
  const content = await readFile(uri)
  const blob = new Blob([content])
  return blob
}
