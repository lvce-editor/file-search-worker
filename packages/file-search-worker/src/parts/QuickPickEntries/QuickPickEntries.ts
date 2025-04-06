import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'

const state: Record<string, QuickPickEntriesModule> = Object.create(null)

const select: Record<string, QuickPickEntriesModule['selectPick']> = Object.create(null)

const getPick: Record<string, QuickPickEntriesModule['getPicks']> = Object.create(null)

export const register = (modules: Record<string, QuickPickEntriesModule>): void => {
  Object.assign(state, modules)
}

export const registerSelect = (modules: Record<string, QuickPickEntriesModule['selectPick']>): void => {
  Object.assign(select, modules)
}

export const registerGetPick = (modules: Record<string, QuickPickEntriesModule['getPicks']>): void => {
  Object.assign(getPick, modules)
}

// deprecated
export const get = (moduleId: string): QuickPickEntriesModule => {
  const module = state[moduleId]
  if (!module) {
    throw new Error(`unknown module "${moduleId}"`)
  }
  return module
}

export const getPicks = (id: string): QuickPickEntriesModule['getPicks'] => {
  const fn = getPick[id]
  return fn
}

export const getSelect = (id: string): QuickPickEntriesModule['selectPick'] => {
  const fn = select[id]
  return fn
}
