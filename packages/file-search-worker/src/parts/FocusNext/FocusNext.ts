import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'

export const focusNext = (state: QuickPickState): Promise<QuickPickState> => {
  const { items, focusedIndex } = state
  const nextIndex = ListIndex.next(items, focusedIndex)
  return focusIndex(state, nextIndex)
}
