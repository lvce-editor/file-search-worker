import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

// TODO when user types letters -> no need to query provider again -> just filter existing results
export const setValue = async (state: QuickPickState, newValue: string): Promise<QuickPickState> => {
  const { value, provider } = state
  if (value === newValue) {
    return state
  }

  // Get the raw picks first
  const picks = await provider.getPicks(newValue)

  // Then get visible items for the current view
  const items = await provider.getVisiblePicks(picks, state.minLineY, state.maxLineY, state.focusedIndex, newValue)
  const focusedIndex = items.length === 0 ? -1 : 0

  return {
    ...state,
    picks,
    items,
    focusedIndex,
    inputSource: InputSource.Script,
    value: newValue,
  }
}
