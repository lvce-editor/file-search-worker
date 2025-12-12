import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { focusLast } from '../src/parts/FocusLast/FocusLast.ts'

test('focusLast focuses the last item', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
  ]

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    items,
    providerId: 3,
  }

  const result = await focusLast(state)

  expect(result.focusedIndex).toBe(2)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})
