import type { ProtoVisibleItem } from '../ProtoVisibleItem/ProtoVisibleItem.ts'
import * as ErrorHandling from '../ErrorHandling/ErrorHandling.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const shouldHide = (item: any): boolean => {
  if (item.id === 'Viewlet.openWidget' && item.args[0] === 'QuickPick') {
    return false
  }
  return true
}

const selectPickBuiltin = async (item: any): Promise<any> => {
  const args = item.args || []
  // TODO ids should be all numbers for efficiency -> also directly can call command
  await RendererWorker.invoke(item.id, ...args)
  if (shouldHide(item)) {
    return {
      command: QuickPickReturnValue.Hide,
    }
  }
  return {
    command: QuickPickReturnValue.KeepOpen,
  }
}

const selectPickExtension = async (item: any): Promise<any> => {
  const id = item.id.slice(4) // TODO lots of string allocation with 'ext.' find a better way to separate builtin commands from extension commands
  try {
    await RendererWorker.invoke('ExtensionHost.executeCommand', id)
  } catch (error) {
    await ErrorHandling.handleError(error, false)
    await ErrorHandling.showErrorDialog(error)
  }
  return {
    command: QuickPickReturnValue.Hide,
  }
}

export const selectPick = async (item: ProtoVisibleItem): Promise<any> => {
  // @ts-ignore
  const id = item.id
  if (id.startsWith('ext.')) {
    return selectPickExtension(item)
  }
  return selectPickBuiltin(item)
}
