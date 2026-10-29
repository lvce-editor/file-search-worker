import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { commandMapRef } from '../CommandMapRef/CommandMapRef.ts'
import * as SearchFileModule from '../SearchFileModule/SearchFileModule.ts'
import * as SearchModules from '../SearchModules/SearchModules.ts'

export const listen = async (): Promise<void> => {
  Object.assign(commandMapRef, CommandMap.commandMap)
  SearchFileModule.register(SearchModules.searchModules)
  await Promise.all([RendererWorker.initializeRendererWorkerForWorker(CommandMap.commandMap), RendererWorker.initializeEditorWorker(0)])
}
