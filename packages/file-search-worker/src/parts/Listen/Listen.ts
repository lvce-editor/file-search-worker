import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as ParentRpc from '../Rpc/Rpc.ts'

export const listen = async (): Promise<void> => {
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  ParentRpc.setRpc(rpc)
}