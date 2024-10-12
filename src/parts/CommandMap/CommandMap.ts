import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as SearchFileWithRipGrep from '../SearchFileWithRipGrep/SearchFileWithRipGrep.ts'

export const commandMap = {
  'SearchFile.searchFile': SearchFile.searchFile,
  'SearchFile.searchFileWithRipGrep': SearchFileWithRipGrep.searchFile,
}
