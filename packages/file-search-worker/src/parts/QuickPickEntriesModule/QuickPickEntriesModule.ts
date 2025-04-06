import type { Dirent } from '../Dirent/Dirent.ts'
import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'

export interface QuickPickEntriesModule {
  readonly state: any
  readonly getPickFileIcon?: (item: ProtoVisibleItem) => Dirent
}
