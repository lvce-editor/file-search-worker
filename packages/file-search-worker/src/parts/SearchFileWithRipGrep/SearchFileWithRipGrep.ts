// TODO create direct connection from electron to file search worker using message ports

import * as GetFileSearchRipGrepArgs from '../GetFileSearchRipGrepArgs/GetFileSearchRipGrepArgs.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'
import * as SplitLines from '../SplitLines/SplitLines.ts'

export const searchFile = async (
  path: string,
  value: string,
  prepare: boolean,
  assetDir = '',
  ifNonMatch?: string | null,
): Promise<readonly string[] | { readonly hash: string; readonly matchesCache: boolean; readonly results: readonly string[] }> => {
  const ripGrepArgs = GetFileSearchRipGrepArgs.getFileSearchRipGrepArgs()
  const options: {
    ifNonMatch?: string | null
    limit: number
    ripGrepArgs: readonly string[]
    searchPath: string
  } = {
    limit: 9_999_999,
    ripGrepArgs,
    searchPath: path,
  }
  if (ifNonMatch !== undefined) {
    options.ifNonMatch = ifNonMatch
  }
  const response = await SearchProcess.invoke('SearchFile.searchFile', options)
  if (typeof response === 'string') {
    return SplitLines.splitLines(response)
  }
  if (response.matchesCache) {
    return { hash: response.hash, matchesCache: true, results: [] }
  }
  return { hash: response.hash, matchesCache: false, results: SplitLines.splitLines(response.results) }
}
