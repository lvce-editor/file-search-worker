import * as DiffType from '../DiffType/DiffType.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const diffType = DiffType.RenderValue

export const isEqual = (oldState: QuickPickState, newState: QuickPickState): boolean => {
  return newState.inputSource === InputSource.User || oldState.value === newState.value
}
