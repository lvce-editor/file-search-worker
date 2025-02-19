import * as DiffType from '../DiffType/DiffType.ts'
import { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const diffType = DiffType.FocusedIndex

export const isEqual = (oldState: QuickPickState, newState: QuickPickState): boolean => {
  return oldState.focusedIndex === newState.focusedIndex
}
