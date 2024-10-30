import * as RemoveLeadingSlash from '../RemoveLeadingSlash/RemoveLeadingSlash.ts'

export const searchFile = async (path: string, value: string, prepare: boolean, assetDir: string) => {
  const fetchUri = `${assetDir}/config/fileMap.json`
  const response = await fetch(fetchUri)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const fileList = await response.json()
  const result = fileList.map(RemoveLeadingSlash.removeLeadingSlash)
  return result
}
