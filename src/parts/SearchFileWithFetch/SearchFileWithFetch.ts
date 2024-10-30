import * as GetJson from '../GetJson/GetJson.ts'
import * as RemoveLeadingSlash from '../RemoveLeadingSlash/RemoveLeadingSlash.ts'

// TODO simplify code
// 1. don't have playground prefix in fileMap json
// 2. remove code here that removes the prefix
export const searchFile = async (path: string, value: string, prepare: boolean, assetDir: string): Promise<readonly string[]> => {
  const fetchUri = `${assetDir}/config/fileMap.json`
  const fileList = await GetJson.getJson(fetchUri)
  const result = fileList.map(RemoveLeadingSlash.removeLeadingSlash)
  const prefixLength = path.slice('fetch:///'.length)
  const final = []
  for (const item of result) {
    final.push(item.slice(prefixLength))
  }
  return final
}
