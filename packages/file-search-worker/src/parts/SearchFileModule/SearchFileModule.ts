import type { SearchFileHandler } from '../SearchFileHandler/SearchFileHandler.ts'

const state: Record<any, SearchFileHandler> = Object.create(null)

export const register = (modules: Record<any, SearchFileHandler>): void => {
  Object.assign(state, modules)
}

export const getModule = (protocol: string): SearchFileHandler => {
  return state[protocol]
}
