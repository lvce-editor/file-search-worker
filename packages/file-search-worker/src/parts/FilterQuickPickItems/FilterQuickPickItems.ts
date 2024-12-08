import * as ConvertToPick from '../ConvertToPick/ConvertToPick.ts'
import * as FilterQuickPickItem from '../FilterQuickPickItem/FilterQuickPickItem.ts'
import * as GetBaseName from '../GetBaseName/GetBaseName.ts'
import type { Pick } from '../Pick/Pick.ts'

export const filterQuickPickItems = (items: readonly string[], value: string): readonly Pick[] => {
  if (!value) {
    return items.map(ConvertToPick.convertToPick)
  }
  const results: Pick[] = []
  for (const item of items) {
    const baseName = GetBaseName.getBaseName(item)
    const matches = FilterQuickPickItem.filterQuickPickItem(value, baseName)
    if (matches.length > 0) {
      results.push({
        pick: item,
        matches,
      })
    }
  }
  return results
}
