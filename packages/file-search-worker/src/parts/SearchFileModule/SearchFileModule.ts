import * as FileSystemProtocol from '../FileSystemProtocol/FileSystemProtocol.ts'
import * as SearchFileMemfs from '../SearchFileMemfs/SearchFileMemfs.ts'
import * as SearchFileFetch from '../SearchFileWithFetch/SearchFileWithFetch.ts'
import * as SearchFileHtml from '../SearchFileWithHtml/SearchFileWithHtml.ts'
import * as SearchFileRipGrep from '../SearchFileWithRipGrep/SearchFileWithRipGrep.ts'

export const getModule = (protocol: string): any => {
  switch (protocol) {
    case FileSystemProtocol.Memfs:
      return SearchFileMemfs.searchFile
    case FileSystemProtocol.Fetch:
      return SearchFileFetch.searchFile
    case FileSystemProtocol.Html:
      return SearchFileHtml.searchFile
    default:
      return SearchFileRipGrep.searchFile
  }
}
