import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as GetWorkspacePath from '../GetWorkspacePath/GetWorkspacePath.ts'
import * as OpenUri from '../OpenUri/OpenUri.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (pick: ProtoVisibleItem): Promise<any> => {
  const description = pick.description
  const fileName = pick.label
  const workspace = await GetWorkspacePath.getWorkspacePath()
  const absolutePath = `${workspace}/${description}/${fileName}`
  await OpenUri.openUri(absolutePath)
  return {
    command: QuickPickReturnValue.Hide,
  }
}
