import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'

export const render2 = async (uid: number, diffResult: readonly number[]): Promise<readonly any[]> => {
  const { oldState, newState } = QuickPickStates.get(uid)
  return ApplyRender.applyRender(oldState, newState, diffResult)
}
