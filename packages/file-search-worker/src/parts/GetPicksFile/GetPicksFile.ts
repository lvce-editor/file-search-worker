import * as GetWorkspacePath from '../GetWorkspacePath/GetWorkspacePath.ts'
import * as SearchFile from '../SearchFile/SearchFile.ts'

const searchFile = async (path: string, value: string): Promise<readonly any[]> => {
  const prepare = true
  // @ts-ignore
  const files = await SearchFile.searchFile(/* path */ path, /* searchTerm */ value, prepare)
  return files
}

export const getPicks = async (searchValue: string): Promise<readonly string[]> => {
  // TODO cache workspace path
  const workspace = await GetWorkspacePath.getWorkspacePath()
  if (!workspace) {
    return []
  }
  const files = await searchFile(workspace, searchValue)
  return files
}
