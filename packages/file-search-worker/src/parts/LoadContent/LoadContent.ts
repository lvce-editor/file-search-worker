import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as GetDefaultValue from '../GetDefaultValue/GetDefaultValue.ts'
import * as GetFilterValue from '../GetFilterValue/GetFilterValue.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPicks from '../GetPicks/GetPicks.ts'
import * as GetQuickPickFileIcons from '../GetQuickPickFileIcons/GetQuickPickFileIcons.ts'
import * as GetQuickPickPrefix from '../GetQuickPickPrefix/GetQuickPickPrefix.ts'
import * as GetQuickPickProviderId from '../GetQuickPickProviderId/GetQuickPickProviderId.ts'
import * as GetQuickPickSubProviderId from '../GetQuickPickSubProviderId/GetQuickPickSubProviderId.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as QuickPickOpenState from '../QuickPickOpenState/QuickPickOpenState.ts'
import * as SetArgs from '../SetArgs/SetArgs.ts'

export const loadContent = async (state: QuickPickState): Promise<QuickPickState> => {
  const { uri, args, fileIconCache, itemHeight, height } = state
  const id = GetQuickPickProviderId.getQuickPickProviderId(uri)
  const value = GetDefaultValue.getDefaultValue(id)
  const prefix = GetQuickPickPrefix.getQuickPickPrefix(value)
  const subId = GetQuickPickSubProviderId.getQuickPickSubProviderId(prefix)
  SetArgs.setArgs(subId, args)
  const newPicks = await GetPicks.getPicks(subId, value)
  Assert.array(newPicks)
  const filterValue = GetFilterValue.getFilterValue(id, value)
  const items = FilterQuickPickItems.filterQuickPickItems(newPicks, filterValue)
  const minLineY = 0
  const maxLineY = Math.min(minLineY + state.maxVisibleItems, newPicks.length)
  const sliced = newPicks.slice(minLineY, maxLineY)
  const { newFileIconCache, icons } = await GetQuickPickFileIcons.getQuickPickFileIcons(sliced, fileIconCache)
  const listHeight = GetListHeight.getListHeight(items.length, itemHeight, height)
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(listHeight, itemHeight, items.length)

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
    inputSource: InputSource.Script,
    focused: true,
    fileIconCache: newFileIconCache,
    icons,
    providerId: id,
    finalDeltaY,
  }
}
