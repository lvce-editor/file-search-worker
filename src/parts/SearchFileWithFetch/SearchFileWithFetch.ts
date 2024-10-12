import * as FileSystemProtocol from '../FileSystemProtocol/FileSystemProtocol.ts'

const removeLeadingSlash = (path: string) => {
  const workspacePath = '' // TODO ask renderer worker for path
  return path.slice(workspacePath.length - FileSystemProtocol.Fetch.length - 2)
}

export const searchFile = async (path: string, value: string, assetDir: string) => {
  const fetchUri = `${assetDir}/config/fileMap.json`
  const response = await fetch(fetchUri)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const fileList = await response.json()
  const result = fileList.map(removeLeadingSlash)
  return result
}
