import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SearchFileMemfs from '../src/parts/SearchFileMemfs/SearchFileMemfs.ts'

test('searches files from memory', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.searchFileWithMemory': () => ['memfs:///folder/file-1.ts', 'memfs:///folder/file-2.ts'],
  })

  const result = await SearchFileMemfs.searchFile('memfs:///folder')

  expect(result).toEqual(['memfs:///folder/file-1.ts', 'memfs:///folder/file-2.ts'])
  expect(mockRpc.invocations).toEqual([['ExtensionHost.searchFileWithMemory', 'memfs:///folder']])
})
