import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as GetQuickPickFileIcons from '../GetQuickPickFileIcons/GetQuickPickFileIcons.ts'
import * as InputSource from '../InputSource/InputSource.ts'

// TODO when user types letters -> no need to query provider again -> just filter existing results
export const setValue = async (state: QuickPickState, newValue: string): Promise<QuickPickState> => {
  const { value, provider, minLineY, maxLineY, fileIconCache } = state
  if (value === newValue) {
    return state
  }
  const newPicks = await provider.getPicks(newValue)
  // @ts-ignore
  const filterValue = provider.getFilterValue(newValue)
  const items = FilterQuickPickItems.filterQuickPickItems(newPicks, filterValue)
  const focusedIndex = items.length === 0 ? -1 : 0
  const sliced = newPicks.slice(minLineY, maxLineY)
  const { newFileIconCache, icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(provider, sliced, fileIconCache)

  return {
    ...state,
    picks: newPicks,
    items,
    focusedIndex,
    inputSource: InputSource.Script,
    value: newValue,
    icons,
    fileIconCache: newFileIconCache,
  }
}
