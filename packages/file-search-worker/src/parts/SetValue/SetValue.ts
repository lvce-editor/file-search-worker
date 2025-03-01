import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as InputSource from '../InputSource/InputSource.ts'

// TODO when user types letters -> no need to query provider again -> just filter existing results
export const setValue = async (state: QuickPickState, newValue: string): Promise<QuickPickState> => {
  if (state.value === newValue) {
    return state
  }
  const newPicks = await state.provider.getPicks(newValue)
  const filterValue = state.provider.getFilterValue(newValue)
  const items = FilterQuickPickItems.filterQuickPickItems(newPicks, filterValue, state.provider)
  const focusedIndex = items.length === 0 ? -1 : 0
  return {
    ...state,
    picks: newPicks,
    items,
    focusedIndex,
    inputSource: InputSource.Script,
  }
}
