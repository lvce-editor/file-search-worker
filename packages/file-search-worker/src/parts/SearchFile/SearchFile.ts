import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as SearchFileModule from '../SearchFileModule/SearchFileModule.ts'

export const searchFile = async (
  path: string,
  value: string,
  prepare: boolean,
  assetDir: string,
  ifNonMatch?: string | null,
): Promise<readonly string[] | { readonly hash: string; readonly matchesCache: boolean; readonly results: readonly string[] }> => {
  const protocol = GetProtocol.getProtocol(path)
  const fn = SearchFileModule.getFn(protocol)
  if (!fn) {
    return RendererWorker.invoke('ExtensionHost.searchFileWithProvider', path, value, prepare)
  }
  const result = await fn(path, value, prepare, assetDir, ifNonMatch)
  return result
}
