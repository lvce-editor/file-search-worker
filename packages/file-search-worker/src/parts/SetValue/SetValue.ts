import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as GetFilterValue from '../GetFilterValue/GetFilterValue.ts'
import * as GetPicks from '../GetPicks/GetPicks.ts'
import * as GetQuickPickFileIcons from '../GetQuickPickFileIcons/GetQuickPickFileIcons.ts'
import * as InputSource from '../InputSource/InputSource.ts'

// TODO when user types letters -> no need to query provider again -> just filter existing results
export const setValue = async (state: QuickPickState, newValue: string): Promise<QuickPickState> => {
  const { value, uri, minLineY, maxLineY, fileIconCache } = state
  if (value === newValue) {
    return state
  }
  const newPicks = await GetPicks.getPicks(uri, newValue)
  const filterValue = GetFilterValue.getFilterValue(uri, newValue)
  const items = FilterQuickPickItems.filterQuickPickItems(newPicks, filterValue)
  const focusedIndex = items.length === 0 ? -1 : 0
  const sliced = newPicks.slice(minLineY, maxLineY)
  const { newFileIconCache, icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(sliced, fileIconCache)

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
