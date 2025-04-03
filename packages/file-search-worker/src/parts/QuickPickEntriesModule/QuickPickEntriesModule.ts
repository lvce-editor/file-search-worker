import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export interface QuickPickEntriesModule {
  readonly state: any
  readonly name: string
  readonly getPlaceholder: () => string
  readonly getNoResults: () => string
  readonly getPicks: (value: any) => Promise<readonly any[]>
  readonly getVisibleItems: (
    items: readonly any[],
    minLineY: number,
    maxLineY: number,
    focusedIndex: number,
    searchValue: string,
  ) => Promise<readonly VisibleItem[]>
  readonly selectPick: (item: any) => Promise<any>
  readonly getFilterValue: (item: any) => string
  readonly getPickFilterValue: (item: any) => string
  readonly getPickDescription: (item: any) => string
  readonly getPickLabel: (item: any) => string
  readonly getPickIcon: (item: any) => string
  readonly getPickFileIcon?: (item: any) => any
  readonly isPrepared: () => boolean
}
