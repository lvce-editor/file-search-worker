import * as FilterQuickPickItem from '../FilterQuickPickItem/FilterQuickPickItem.ts'
import type { Pick } from '../Pick/Pick.ts'

const getBaseName = (path: string): string => {
  return path.slice(path.lastIndexOf('/') + 1)
}

const emptyMatches: readonly number[] = []

const convertToPick = (item: string): Pick => {
  return {
    pick: item,
    matches: emptyMatches,
  }
}

export const filterQuickPickItems = (items: readonly string[], value: string): readonly Pick[] => {
  if (!value) {
    return items.map(convertToPick)
  }
  const results: Pick[] = []
  for (const item of items) {
    const baseName = getBaseName(item)
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
