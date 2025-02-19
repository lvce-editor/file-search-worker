export interface QuickPickViewModel {
  readonly visibleItems: readonly any[]
  readonly value: string
  readonly cursorOffset: number
  readonly focusedIndex: number
  readonly height: number
  readonly focused: boolean
}
