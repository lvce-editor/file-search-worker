import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'

export const wrapCommand = (fn: any): any => {
  const wrapped = async (uid: number, ...args: readonly any[]): Promise<void> => {
    const { newState } = QuickPickStates.get(uid)
    const newerState = await fn(newState, ...args)
    QuickPickStates.set(uid, newState, newerState)
  }
  return wrapped
}
