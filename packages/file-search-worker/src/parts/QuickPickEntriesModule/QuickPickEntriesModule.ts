import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export interface QuickPickEntriesModule<T = any> {
  readonly getPlaceholder: () => string
  readonly getNoResults: () => string
  readonly getPicks: (value: string) => Promise<readonly T[]>
  readonly selectPick: (item: T) => Promise<any>
  readonly getVisibleItems: (
    items: readonly T[],
    minLineY: number,
    maxLineY: number,
    focusedIndex: number,
    setSize: number,
    icons: readonly string[],
  ) => readonly VisibleItem[]
}
