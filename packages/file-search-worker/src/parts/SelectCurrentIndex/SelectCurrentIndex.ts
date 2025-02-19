import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'

export const selectCurrentIndex = (state: QuickPickState): Promise<QuickPickState> => {
  return selectIndex(state, state.focusedIndex)
}
