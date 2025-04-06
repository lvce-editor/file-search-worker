import type { Dirent } from '../Dirent/Dirent.ts'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export interface QuickPickEntriesModule {
  readonly state: any
  readonly getPicks: (value: string) => Promise<readonly ProtoVisibleItem[]>
  readonly selectPick: (item: ProtoVisibleItem) => Promise<any>
  readonly getPickFileIcon?: (item: ProtoVisibleItem) => Dirent
  readonly getVisibleItems: (items: readonly ProtoVisibleItem[], icons: readonly string[]) => readonly ProtoVisibleItem[]
}
