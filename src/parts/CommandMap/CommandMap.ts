import * as FileSystemMemory from '../FileSystemMemory/FileSystemMemory.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as SearchFileWithFetch from '../SearchFileWithFetch/SearchFileWithFetch.ts'
import * as SearchFileWithHtml from '../SearchFileWithHtml/SearchFileWithHtml.ts'
import * as SearchFileWithRipGrep from '../SearchFileWithRipGrep/SearchFileWithRipGrep.ts'

export const commandMap = {
  'SearchFile.searchFile': SearchFile.searchFile,
  'SearchFile.searchFileWithRipGrep': SearchFileWithRipGrep.searchFile,
  'SearchFile.searchFileWithHtml': SearchFileWithHtml.searchFile,
  'SearchFile.searchFileWithFetch': SearchFileWithFetch.searchFile,
  'FileSystemMemory.readFile': FileSystemMemory.readFile,
  'FileSystemMemory.writeFile': FileSystemMemory.writeFile,
  'FileSystemMemory.mkdir': FileSystemMemory.mkdir,
  'FileSystemMemory.readDirWithFileTypes': FileSystemMemory.readDirWithFileTypes,
  'FileSystemMemory.getBlobUrl': FileSystemMemory.getBlobUrl,
  'FileSystemMemory.getBlob': FileSystemMemory.getBlob,
  'FileSystemMemory.chmod': FileSystemMemory.chmod,
}
