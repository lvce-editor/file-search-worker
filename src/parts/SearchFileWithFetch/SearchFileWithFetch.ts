import * as GetJson from '../GetJson/GetJson.ts'
import * as RemoveLeadingSlash from '../RemoveLeadingSlash/RemoveLeadingSlash.ts'

export const searchFile = async (path: string, value: string, prepare: boolean, assetDir: string) => {
  const fetchUri = `${assetDir}/config/fileMap.json`
  const fileList = await GetJson.getJson(fetchUri)
  const result = fileList.map(RemoveLeadingSlash.removeLeadingSlash)
  return result
}
