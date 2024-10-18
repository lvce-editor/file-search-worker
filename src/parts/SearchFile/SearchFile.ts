import * as FileSystemProtocol from '../FileSystemProtocol/FileSystemProtocol.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'

const getModule = (protocol: string) => {
  switch (protocol) {
    case FileSystemProtocol.Memfs:
      return import('../SearchFileMemfs/SearchFileMemfs.ts')
    case FileSystemProtocol.Fetch:
      return import('../SearchFileWithFetch/SearchFileWithFetch.ts')
    case FileSystemProtocol.Html:
      return import('../SearchFileWithHtml/SearchFileWithHtml.ts')
    default:
      return import('../SearchFileWithRipGrep/SearchFileWithRipGrep.ts')
  }
}

export const searchFile = async (path: string, value: string, prepare: boolean, assetDir: string): Promise<string[]> => {
  const protocol = GetProtocol.getProtocol(path)
  // TODO call different providers depending on protocol
  const module = await getModule(protocol)
  const result = await module.searchFile(path, value, prepare, assetDir)
  return result
}
