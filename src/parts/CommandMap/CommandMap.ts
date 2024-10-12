import * as SearchFile from '../SearchFile/SearchFile.ts'
import * as SearchFileWithRipGrep from '../SearchFileWithRipGrep/SearchFileWithRipGrep.ts'
import * as SearchFileWithHtml from '../SearchFileWithHtml/SearchFileWithHtml.ts'

export const commandMap = {
  'SearchFile.searchFile': SearchFile.searchFile,
  'SearchFile.searchFileWithRipGrep': SearchFileWithRipGrep.searchFile,
  'SearchFile.searchFileWithHtml': SearchFileWithHtml.searchFileWithHtml,
}
