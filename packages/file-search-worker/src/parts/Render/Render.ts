import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as Diff from '../Diff/Diff.ts'
import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'

export const doRender = (uid: number): readonly any[] => {
  const { oldState, newState } = QuickPickStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  return ApplyRender.applyRender(oldState, newState, diffResult)
}
