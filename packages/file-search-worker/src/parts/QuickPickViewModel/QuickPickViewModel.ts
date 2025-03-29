export interface QuickPickViewModel {
  readonly visibleItems: readonly any[]
  readonly value: string
  readonly cursorOffset: number
  readonly oldFocusedIndex: number
  readonly newFocusedIndex: number
  readonly height: number
  readonly focused: boolean
  readonly uid: number
  readonly renderAllItems?: boolean
}
