import type { SearchFileHandler } from '../SearchFileHandler/SearchFileHandler.ts'
import * as FileSystemProcotol from '../FileSystemProtocol/FileSystemProtocol.ts'
import * as FileSystemProtocol from '../FileSystemProtocol/FileSystemProtocol.ts'
import * as SearchFileMemfs from '../SearchFileMemfs/SearchFileMemfs.ts'
import * as SearchFileFetch from '../SearchFileWithFetch/SearchFileWithFetch.ts'
import * as SearchFileHtml from '../SearchFileWithHtml/SearchFileWithHtml.ts'
import * as SearchFileRipGrep from '../SearchFileWithRipGrep/SearchFileWithRipGrep.ts'

export const searchModules: Record<any, SearchFileHandler> = {
  [FileSystemProtocol.Memfs]: SearchFileMemfs.searchFile,
  [FileSystemProcotol.Fetch]: SearchFileFetch.searchFile,
  [FileSystemProtocol.Html]: SearchFileHtml.searchFile,
  [FileSystemProcotol.File]: SearchFileRipGrep.searchFile,
  [FileSystemProcotol.Default]: SearchFileRipGrep.searchFile,
}
