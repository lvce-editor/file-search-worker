import * as AssetDir from '../AssetDir/AssetDir.ts'
import type { Dirent } from '../Dirent/Dirent.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as FileMapUrl from '../FileMapUrl/FileMapUrl.ts'
import * as GetJson from '../GetJson/GetJson.ts'
import * as GetText from '../GetText/GetText.ts'
import * as PathSeparatorType from '../PathSeparatorType/PathSeparatorType.ts'

// TODO move all of this to an extension

export const readFile = async (uri: string): Promise<string> => {
  const fetchUri = `${AssetDir.assetDir}${uri}`
  const text = await GetText.getText(fetchUri)
  return text
}

export const writeFile = (): void => {
  throw new Error('not implemented')
}

export const mkdir = (): void => {
  throw new Error('not implemented')
}

export const remove = (): void => {
  throw new Error('not implemented')
}

export const readDirWithFileTypes = async (uri: string): Promise<readonly Dirent[]> => {
  const fileList = await GetJson.getJson(FileMapUrl.fileMapUrl)
  const dirents: Dirent[] = []
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

export const chmod = (): void => {
  throw new Error('[memfs] chmod not implemented')
}

export const getBlob = async (uri: string, type?: string): Promise<Blob> => {
  const content = await readFile(uri)
  const blob = new Blob([content], { type })
  return blob
}
