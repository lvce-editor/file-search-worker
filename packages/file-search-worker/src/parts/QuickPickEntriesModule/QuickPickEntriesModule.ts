import type { Dirent } from '../Dirent/Dirent.ts'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export interface QuickPickEntriesModule<T = any> {
  readonly state: any
  readonly name: string
  readonly getPlaceholder: () => string
  readonly getNoResults: () => string
  readonly getPicks: (value: string) => Promise<readonly T[]>
  readonly selectPick: (item: T) => Promise<any>
  readonly getFilterValue: (item: T) => string
  readonly getPickFileIcon?: (item: T) => Dirent
  readonly getVisibleItems: (items: readonly T[], icons: readonly string[]) => readonly ProtoVisibleItem[]
}
