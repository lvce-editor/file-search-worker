import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as OpenWorkspaceFolder from '../OpenWorkspaceFolder/OpenWorkspaceFolder.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

// TODO selectPick should be independent of show/hide
export const selectPick = async (pick: ProtoVisibleItem): Promise<any> => {
  const path = `${pick.description}/${pick.label}`
  await OpenWorkspaceFolder.openWorkspaceFolder(path)
  return {
    command: QuickPickReturnValue.Hide,
  }
}
