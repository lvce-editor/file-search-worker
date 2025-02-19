import * as DiffModules from '../DiffModules/DiffModules.ts'
import { QuickPickState } from '../QuickPickState/QuickPickState.ts'

export const diff = (oldState: QuickPickState, newState: QuickPickState): readonly number[] => {
  const diffResult: number[] = []
  for (const module of DiffModules.modules) {
    if (!module.isEqual(oldState, newState)) {
      diffResult.push(module.diffType)
    }
  }
  return diffResult
}
