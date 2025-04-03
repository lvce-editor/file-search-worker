import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly any[] => {
  const { oldState, newState } = QuickPickStates.get(uid)
  QuickPickStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
