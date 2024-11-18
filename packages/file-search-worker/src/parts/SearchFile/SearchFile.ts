import * as FileSystemProtocol from '../FileSystemProtocol/FileSystemProtocol.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as SearchFileMemfs from '../SearchFileMemfs/SearchFileMemfs.ts'
import * as SearchFileFetch from '../SearchFileWithFetch/SearchFileWithFetch.ts'
import * as SearchFileHtml from '../SearchFileWithHtml/SearchFileWithHtml.ts'
import * as SearchFileRipGrep from '../SearchFileWithRipGrep/SearchFileWithRipGrep.ts'

const getModule = (protocol: string): any => {
  switch (protocol) {
    case FileSystemProtocol.Memfs:
      return SearchFileMemfs
    case FileSystemProtocol.Fetch:
      return SearchFileFetch
    case FileSystemProtocol.Html:
      return SearchFileHtml
    default:
      return SearchFileRipGrep
  }
}

export const searchFile = async (path: string, value: string, prepare: boolean, assetDir: string): Promise<readonly any[]> => {
  const protocol = GetProtocol.getProtocol(path)
  // TODO call different providers depending on protocol
  const module = await getModule(protocol)
  const result = await module.searchFile(path, value, prepare, assetDir)
  return result
}
