import * as DiffType from '../DiffType/DiffType.ts'
import { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const diffType = DiffType.Value

export const isEqual = (oldState: QuickPickState, newState: QuickPickState): boolean => {
  return (
    oldState.items === newState.items &&
    oldState.minLineY === newState.minLineY &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.focusedIndex === newState.focusedIndex
  )
}
