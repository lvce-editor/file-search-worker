import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const { activateByEvent, closeWidget, getFileIcon, getFolderIcon, invoke, invokeAndTransfer, openUri, set, setFocus, showErrorDialog } =
  RendererWorker

export const registerMockRpc = (invoke: (method: string, ...args: readonly unknown[]) => Promise<unknown>): void => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)
}
