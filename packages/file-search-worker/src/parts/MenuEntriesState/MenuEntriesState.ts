interface MenuEntriesState {
  menuEntries: readonly any[]
}

const state: MenuEntriesState = {
  menuEntries: [],
}

export const getAll = (): readonly any[] => {
  return state.menuEntries
}
