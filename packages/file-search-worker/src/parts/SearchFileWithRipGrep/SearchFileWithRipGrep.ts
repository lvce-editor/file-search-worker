// TODO create direct connection from electron to file search worker using message ports

import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as GetFileSearchRipGrepArgs from '../GetFileSearchRipGrepArgs/GetFileSearchRipGrepArgs.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'
import * as SplitLines from '../SplitLines/SplitLines.ts'

export const searchFile = async (path: string, value: string, prepare: boolean): Promise<any> => {
  const ripGrepArgs = GetFileSearchRipGrepArgs.getFileSearchRipGrepArgs()
  const options = {
    ripGrepArgs,
    searchPath: path,
    limit: 9_999_999,
  }
  const stdout = await SearchProcess.invoke('SearchFile.searchFile', options)
  const lines = SplitLines.splitLines(stdout)
  if (!prepare) {
    return lines
  }
  const filtered = FilterQuickPickItems.filterQuickPickItems(lines, value)
  return filtered
}
