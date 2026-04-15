import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SearchFileWithHtml from '../src/parts/SearchFileWithHtml/SearchFileWithHtml.ts'

test('searches files with html backend', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionHost.searchFileWithHtml': () => ['html:///folder/file-1.ts'],
  })

  const result = await SearchFileWithHtml.searchFile('html:///folder')

  expect(result).toEqual(['html:///folder/file-1.ts'])
  expect(mockRpc.invocations).toEqual([['ExtensionHost.searchFileWithHtml', 'html:///folder']])
})
