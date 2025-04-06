import * as GetWorkspacePath from '../GetWorkspacePath/GetWorkspacePath.ts'
import * as OpenUri from '../OpenUri/OpenUri.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectPick = async (pick: any): Promise<any> => {
  if (typeof pick === 'object') {
    pick = pick.pick
  }
  const workspace = await GetWorkspacePath.getWorkspacePath()
  const absolutePath = `${workspace}/${pick}`
  await OpenUri.openUri(absolutePath)
  return {
    command: QuickPickReturnValue.Hide,
  }
}
