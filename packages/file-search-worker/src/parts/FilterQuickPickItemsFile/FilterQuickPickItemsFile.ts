import type { Pick } from '../Pick/Pick.ts'
import * as ConvertToPick from '../ConvertToPick/ConvertToPick.ts'
import * as FilterQuickPickItem from '../FilterQuickPickItem/FilterQuickPickItem.ts'
import { pathBaseName } from '../Workspace/Workspace.ts'

export const filterQuickPickItemsFile = (files: readonly string[], value: string): readonly Pick[] => {
  if (!value) {
    return files.map(ConvertToPick.convertToPick)
  }
  const results: Pick[] = []
  for (const file of files) {
    const filterValue = pathBaseName(file)
    const matches = FilterQuickPickItem.filterQuickPickItem(value, filterValue)
    if (matches.length > 0) {
      results.push({
        pick: file,
        matches,
      })
    }
  }
  return results
}
