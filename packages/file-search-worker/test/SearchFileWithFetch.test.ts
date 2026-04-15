import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SearchFileWithFetch from '../src/parts/SearchFileWithFetch/SearchFileWithFetch.ts'

test('searches files with fetch backend', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.searchFileWithFetch': () => ['https://example.com/file-1.ts', 'https://example.com/file-2.ts'],
  })

  const result = await SearchFileWithFetch.searchFile('https://example.com')

  expect(result).toEqual(['https://example.com/file-1.ts', 'https://example.com/file-2.ts'])
  expect(mockRpc.invocations).toEqual([['ExtensionHost.searchFileWithFetch', 'https://example.com']])
})
