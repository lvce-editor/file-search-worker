import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { commandMapRef } from '../CommandMapRef/CommandMapRef.ts'
import { registerCommands } from '../QuickPickStates/QuickPickStates.ts'
import * as SearchFileModule from '../SearchFileModule/SearchFileModule.ts'
import * as SearchModules from '../SearchModules/SearchModules.ts'

export const listen = async (): Promise<void> => {
  Object.assign(commandMapRef, CommandMap.commandMap)
  registerCommands(CommandMap.commandMap)
  SearchFileModule.register(SearchModules.searchModules)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RendererWorker.set(rpc)
}
