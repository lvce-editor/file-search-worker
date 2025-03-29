import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'
import * as QuickPickEntriesModules from '../QuickPickEntriesModules/QuickPickEntriesModules.ts'
import * as RpcId from '../RpcId/RpcId.ts'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'
import * as SearchFileModule from '../SearchFileModule/SearchFileModule.ts'
import * as SearchModules from '../SearchModules/SearchModules.ts'

export const listen = async (): Promise<void> => {
  SearchFileModule.register(SearchModules.searchModules)
  QuickPickEntries.register(QuickPickEntriesModules.quickPickEntriesModules)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RpcRegistry.set(RpcId.RendererWorker, rpc)
}
