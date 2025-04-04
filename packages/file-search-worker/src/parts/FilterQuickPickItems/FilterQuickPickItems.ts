import type { Pick } from '../Pick/Pick.ts'
import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import * as ConvertToPick from '../ConvertToPick/ConvertToPick.ts'
import * as FilterQuickPickItem from '../FilterQuickPickItem/FilterQuickPickItem.ts'
import { pathBaseName } from '../Workspace/Workspace.ts'

export const filterQuickPickItems = (items: readonly string[], value: string, provider?: QuickPickEntriesModule): readonly Pick[] => {
  if (!value) {
    return items.map(ConvertToPick.convertToPick)
  }
  const results: Pick[] = []
  for (const item of items) {
    let filterValue = ''
    if (provider) {
      // @ts-ignore
      filterValue = provider.getPickLabel(item)
    } else {
      filterValue = pathBaseName(item)
    }
    const matches = FilterQuickPickItem.filterQuickPickItem(value, filterValue)
    if (matches.length > 0) {
      results.push({
        pick: item,
        matches,
      })
    }
  }
  return results
}
