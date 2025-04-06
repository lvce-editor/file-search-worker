import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import type { SelectPickResult } from '../SelectPickRresult/SelectPickResult.ts'

export interface SelectPick {
  (item: ProtoVisibleItem): Promise<SelectPickResult>
}
