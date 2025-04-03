import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export interface QuickPickEntriesModule<T = any> {
  readonly state: any
  readonly name: string
  readonly getPlaceholder: () => string
  readonly getNoResults: () => string
  readonly getPicks: (value: string) => Promise<readonly T[]>
  readonly selectPick: (item: T) => Promise<any>
  readonly getFilterValue: (item: T) => string
  readonly getPickFilterValue: (item: T) => string
  readonly getPickDescription: (item: T) => string
  readonly getPickLabel: (item: T) => string
  readonly getPickIcon: (item: T) => string
  readonly getPickFileIcon?: (item: T) => string
  readonly isPrepared: () => boolean
  readonly getVisibleItems: (minLineY: number, maxLineY: number, focusedIndex: number, searchValue: string) => Promise<readonly VisibleItem[]>
}
