import * as FileMapUrl from '../FileMapUrl/FileMapUrl.ts'
import * as GetJson from '../GetJson/GetJson.ts'
import * as RemoveLeadingSlash from '../RemoveLeadingSlash/RemoveLeadingSlash.ts'

export const searchFile = async (path: string, value: string, prepare: boolean, assetDir: string) => {
  const fileList = await GetJson.getJson(FileMapUrl.fileMapUrl)
  const result = fileList.map(RemoveLeadingSlash.removeLeadingSlash)
  return result
}
