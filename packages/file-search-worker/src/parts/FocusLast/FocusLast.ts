import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import * as ListIndex from '../ListIndex/ListIndex.js'

export const focusLast = (state: QuickPickState): Promise<QuickPickState> => {
  const { items } = state
  return focusIndex(state, ListIndex.last(items))
}
