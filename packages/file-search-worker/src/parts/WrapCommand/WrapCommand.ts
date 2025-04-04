import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'

export const wrapCommand = (fn: any): any => {
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
