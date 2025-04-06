import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'

export interface WrappedFn {
  (uid: number, ...args: readonly any[]): Promise<void>
}

interface Fn {
  (state: QuickPickState, ...args: readonly any[]): Promise<QuickPickState>
}

export const wrapCommand = (fn: Fn): WrappedFn => {
  const wrapped = async (uid: number, ...args: readonly any[]): Promise<void> => {
    const { newState } = QuickPickStates.get(uid)
    const newerState = await fn(newState, ...args)
    if (newState === newerState) {
      return
    }
    const latest = QuickPickStates.get(uid)
    QuickPickStates.set(uid, latest.oldState, newerState)
  }
  return wrapped
}
