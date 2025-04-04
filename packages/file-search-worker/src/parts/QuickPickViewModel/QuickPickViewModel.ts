import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export interface QuickPickViewModel {
  readonly visibleItems: readonly VisibleItem[]
  readonly value: string
  readonly cursorOffset: number
  readonly oldFocusedIndex: number
  readonly newFocusedIndex: number
  readonly height: number
  readonly focused: boolean
  readonly uid: number
}
