import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { registerCommands } from '../QuickPickStates/QuickPickStates.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import * as SearchFileModule from '../SearchFileModule/SearchFileModule.ts'
import * as SearchModules from '../SearchModules/SearchModules.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  SearchFileModule.register(SearchModules.searchModules)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RendererWorker.set(rpc)
}
