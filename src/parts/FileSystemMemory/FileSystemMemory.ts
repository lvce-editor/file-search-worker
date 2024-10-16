import * as DirentType from '../DirentType/DirentType.ts'
import * as PathSeparatorType from '../PathSeparatorType/PathSeparatorType.ts'

// TODO move this to an extension?

export const name = 'Memory'

export const state = {
  files: Object.create(null),
}

const getDirent = (uri: string) => {
  return state.files[uri]
}

export const readFile = (uri: string) => {
  const dirent = getDirent(uri)
  if (!dirent) {
    throw new Error(`File not found: ${uri}`)
  }
  if (dirent.type !== DirentType.File) {
    throw new Error('file is a directory')
  }
  return dirent.content
}

const ensureParentDir = (uri: string) => {
  const startIndex = 0
  let endIndex = uri.indexOf(PathSeparatorType.Slash)
  while (endIndex >= 0) {
    const part = uri.slice(startIndex, endIndex + 1)
    state.files[part] = {
      type: DirentType.Directory,
      content: '',
    }
    endIndex = uri.indexOf(PathSeparatorType.Slash, endIndex + 1)
  }
}

export const writeFile = (uri: string, content: string) => {
  const dirent = getDirent(uri)
  if (dirent) {
    dirent.content = content
  } else {
    ensureParentDir(uri)
    state.files[uri] = {
      type: DirentType.File,
      content,
    }
  }
}

export const mkdir = (uri: string) => {
  if (!uri.endsWith(PathSeparatorType.Slash)) {
    uri += PathSeparatorType.Slash
  }
  ensureParentDir(uri)
  state.files[uri] = {
    type: DirentType.Directory,
    content: '',
  }
}

export const getPathSeparator = () => {
  return PathSeparatorType.Slash
}

export const remove = (uri: string) => {
  const toDelete = []
  for (const key of Object.keys(state.files)) {
    if (key.startsWith(uri)) {
      toDelete.push(key)
    }
  }
  for (const key of toDelete) {
    delete state.files[key]
  }
}

export const readDirWithFileTypes = (uri: string) => {
  if (!uri.endsWith(PathSeparatorType.Slash)) {
    uri += PathSeparatorType.Slash
  }
  const dirents = []
  for (const [key, value] of Object.entries(state.files)) {
    if (key.startsWith(uri)) {
      // @ts-ignore
      switch (value.type) {
        case DirentType.Directory:
          if (!key.slice(0, -1).includes(PathSeparatorType.Slash, uri.length) && key !== `${uri}/` && key !== uri) {
            dirents.push({
              // @ts-ignore
              type: value.type,
              name: key.slice(uri.length, -1),
            })
          }
          break
        case DirentType.File:
          if (!key.includes(PathSeparatorType.Slash, uri.length + 1)) {
            dirents.push({
              // @ts-ignore
              type: value.type,
              name: key.slice(uri.length),
            })
          }
          break
        default:
          break
      }
    }
  }
  return dirents
}

export const getBlobUrl = (uri: string) => {
  const content = readFile(uri)
  const blob = new Blob([content])
  const url = URL.createObjectURL(blob)
  return url
}

export const getBlob = (uri: string) => {
  const content = readFile(uri)
  const blob = new Blob([content])
  return blob
}

export const chmod = () => {
  throw new Error('[memfs] chmod not implemented')
}

export const getFiles = () => {
  return state.files
}
