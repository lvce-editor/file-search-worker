import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as SearchFileModule from '../SearchFileModule/SearchFileModule.ts'

export const searchFile = async (path: string, value: string, prepare: boolean, assetDir: string): Promise<readonly any[]> => {
  const protocol = GetProtocol.getProtocol(path)
  // TODO call different providers depending on protocol
  const fn = SearchFileModule.getFn(protocol)
  const result = await fn(path, value, prepare, assetDir)
  return result
}
