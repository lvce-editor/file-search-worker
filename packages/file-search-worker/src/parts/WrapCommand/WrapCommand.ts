import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'

export const wrapCommand = (fn: any): any => {
  const wrapped = async (uid: number, ...args: readonly any[]): Promise<void> => {
    const { newState } = QuickPickStates.get(uid)
    const newerState = await fn(newState, ...args)
    if (newState === newerState) {
      return
    }
    const latest = QuickPickStates.get(uid)
    const merged: QuickPickState = {
      ...latest.newState,
      ...newerState,
    }
    QuickPickStates.set(uid, latest.newState, merged)
  }
  return wrapped
}
