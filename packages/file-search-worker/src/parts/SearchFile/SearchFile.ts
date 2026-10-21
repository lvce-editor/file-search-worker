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
  let response: readonly string[] | { readonly hash: string; readonly matchesCache: boolean; readonly results: readonly string[] }
  if (!fn) {
    response = await RendererWorker.invoke('ExtensionHost.searchFileWithProvider', path, value, prepare)
  } else {
    response = await fn(path, value, prepare, assetDir, ifNonMatch)
  }
  if (!Array.isArray(response) || ifNonMatch === undefined) {
    return response
  }
  try {
    const hashInput = JSON.stringify([path, value, prepare, assetDir, response])
    const hashBytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(hashInput))
    const hash = Array.from(new Uint8Array(hashBytes), (byte) => byte.toString(16).padStart(2, '0')).join('')
    return {
      hash,
      matchesCache: hash === ifNonMatch,
      results: hash === ifNonMatch ? [] : response,
    }
  } catch {
    return response
  }
}
