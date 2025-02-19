import * as DiffType from '../DiffType/DiffType.ts'
import { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const diffType = DiffType.RenderFocus

export const isEqual = (oldState: QuickPickState, newState: QuickPickState): boolean => {
  return oldState.focused === newState.focused
}
