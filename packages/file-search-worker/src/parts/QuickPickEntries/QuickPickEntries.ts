import type { QuickPickEntriesModule } from '../QuickPickEntriesModule/QuickPickEntriesModule.ts'

const state: Record<string, QuickPickEntriesModule> = Object.create(null)

export const register = (modules: Record<string, QuickPickEntriesModule>): void => {
  Object.assign(state, modules)
}

export const get = (moduleId: string): QuickPickEntriesModule => {
  const module = state[moduleId]
  if (!module) {
    throw new Error(`unknown module "${moduleId}"`)
  }
  return module
}
