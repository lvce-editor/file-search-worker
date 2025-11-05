import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

interface MenuEntriesState {
  menuEntries: readonly any[]
}

const state: MenuEntriesState = {
  menuEntries: [],
}

export const getAll = async (): Promise<readonly any[]> => {
  try {
    // @ts-ignore
    return await RendererWorker.invoke('Layout.getAllQuickPickMenuEntries')
  } catch {
    // ignore
  }
  return state.menuEntries
}

export const add = (menuEntries: readonly any[]): void => {
  state.menuEntries = [...state.menuEntries, ...menuEntries]
}

export const clear = (): void => {
  state.menuEntries = []
}
