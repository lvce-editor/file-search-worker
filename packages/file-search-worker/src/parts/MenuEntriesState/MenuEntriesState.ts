interface MenuEntriesState {
  menuEntries: readonly any[]
}

export const state: MenuEntriesState = {
  menuEntries: [],
}

export const getAll = () => {
  return state.menuEntries
}

export const add = (menuEntries: any[]) => {
  state.menuEntries = [...state.menuEntries, ...menuEntries]
}
