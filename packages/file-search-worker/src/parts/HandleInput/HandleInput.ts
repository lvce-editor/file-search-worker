import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as FilterQuickPickItems from '../FilterQuickPickItems/FilterQuickPickItems.ts'
import * as InputSource from '../InputSource/InputSource.ts'

// TODO when user types letters -> no need to query provider again -> just filter existing results
export const handleInput = async (
  state: QuickPickState,
  newValue: string,
  cursorOffset: number,
  inputSource = InputSource.Script,
): Promise<QuickPickState> => {
  if (state.value === newValue) {
    return state
  }
  // @ts-ignore
  state.value = newValue
  // @ts-ignore
  state.inputSource = inputSource
  const newPicks = await state.provider.getPicks(newValue)
  const filterValue = state.provider.getFilterValue(newValue)
  const items = FilterQuickPickItems.filterQuickPickItems(newPicks, filterValue)
  const focusedIndex = items.length === 0 ? -1 : 0
  return {
    ...state,
    picks: newPicks,
    items,
    focusedIndex,
    cursorOffset,
  }
}
