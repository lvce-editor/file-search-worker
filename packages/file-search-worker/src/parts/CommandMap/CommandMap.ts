import { handleMessagePort } from '../HandleMessagePort/HandleMessagePort.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'

export const commandMap = {
  'FileSearch.handleMessagePort': handleMessagePort,
  'FileSearch.searchFile': SearchFile.searchFile,
  'SearchFile.searchFile': SearchFile.searchFile,
}
