import type { GetPicks } from '../GetPicks/GetPicks.ts'
import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'
import type { SelectPick } from '../SelectPick/SelectPick.ts'

/**
 * @deprecated
 */
const state: Record<string, QuickPickEntriesModule> = Object.create(null)

const select: Record<string, SelectPick> = Object.create(null)

const getPick: Record<string, GetPicks> = Object.create(null)

export const register = (modules: Record<string, QuickPickEntriesModule>): void => {
  Object.assign(state, modules)
}

export const registerSelect = (modules: Record<string, SelectPick>): void => {
  Object.assign(select, modules)
}

export const registerGetPick = (modules: Record<string, GetPicks>): void => {
  Object.assign(getPick, modules)
}

/**
 * @deprecated
 */
export const get = (moduleId: string): QuickPickEntriesModule => {
  const module = state[moduleId]
  if (!module) {
    throw new Error(`unknown module "${moduleId}"`)
  }
  return module
}

export const getPicks = (id: string): GetPicks => {
  const fn = getPick[id]
  return fn
}

export const getSelect = (id: string): SelectPick => {
  const fn = select[id]
  return fn
}
