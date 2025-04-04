import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as GetDefaultValue from '../GetDefaultValue/GetDefaultValue.ts'
import * as GetQuickPickFileIcons from '../GetQuickPickFileIcons/GetQuickPickFileIcons.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'
import * as QuickPickOpenState from '../QuickPickOpenState/QuickPickOpenState.ts'

export const loadContent = async (state: QuickPickState): Promise<QuickPickState> => {
  const { uri, args, fileIconCache } = state
  const value = GetDefaultValue.getDefaultValue(uri)
  const provider = QuickPickEntries.get(uri)
  // @ts-ignore
  if (provider.setArgs) {
    // @ts-ignore
    provider.setArgs(args)
  }
  const newPicks = await provider.getPicks(value)
  Assert.array(newPicks)
  const filterValue = provider.getFilterValue(value)
  const items = FilterQuickPickItems.filterQuickPickItems(newPicks, filterValue, provider)
  const minLineY = 0
  const maxLineY = Math.min(minLineY + state.maxVisibleItems, newPicks.length)
  const sliced = newPicks.slice(minLineY, maxLineY)
  const { newFileIconCache, icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(provider, sliced, fileIconCache)
  return {
    ...state,
    picks: newPicks,
    items,
    focusedIndex: 0,
    state: QuickPickOpenState.Finished,
    minLineY,
    maxLineY,
    value,
    cursorOffset: value.length,
    provider,
    inputSource: InputSource.Script,
    focused: true,
    fileIconCache: newFileIconCache,
    icons,
  }
}
