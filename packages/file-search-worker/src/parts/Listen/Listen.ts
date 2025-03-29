import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as RpcId from '../RpcId/RpcId.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'
import * as SearchFileModule from '../SearchFileModule/SearchFileModule.ts'
import * as SearchModules from '../SearchModules/SearchModules.ts'

export const listen = async (): Promise<void> => {
  SearchFileModule.register(SearchModules.searchModules)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RpcRegistry.set(RpcId.RendererWorker, rpc)
}
