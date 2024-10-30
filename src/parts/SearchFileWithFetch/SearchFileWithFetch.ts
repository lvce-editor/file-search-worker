import * as GetJson from '../GetJson/GetJson.ts'

const removeLeadingSlash = (path: string) => {
  if (path.startsWith('/')) {
    return path.slice(1)
  }
  return path
}

export const searchFile = async (path: string, value: string, prepare: boolean, assetDir: string) => {
  const fetchUri = `${assetDir}/config/fileMap.json`
  const fileList = await GetJson.getJson(fetchUri)
  const result = fileList.map(removeLeadingSlash)
  return result
}
