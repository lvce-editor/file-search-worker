import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'

export const initialize = async (): Promise<void> => {
  // TODO
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    async send(port) {
      await RendererWorker.sendMessagePortToEditorWorker(port, 0)
    },
  })
  EditorWorker.set(rpc)
}
