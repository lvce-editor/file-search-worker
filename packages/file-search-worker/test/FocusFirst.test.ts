import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import { focusFirst } from '../src/parts/FocusFirst/FocusFirst.ts'
import * as VirtualList from '../src/parts/VirtualList/VirtualList.ts'

test('focusFirst focuses the first item', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => 'icon',
    'IconTheme.getFolderIcon': () => 'icon',
  })

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
  ]

  const virtualList = VirtualList.create({ headerHeight: 38, itemHeight: 20, minimumSliderSize: 20 })
  const state: QuickPickState = {
    ...virtualList,
    args: [],
    cursorOffset: 0,
    fileIconCache: {},
    focused: false,
    focusedIndex: 1,
    height: 300,
    icons: [],
    inputSource: 0,
    items,
    maxVisibleItems: 10,
    picks: [],
    platform: 0,
    providerId: 3,
    recentPickIds: {},
    recentPicks: [],
    scrollBarActive: false,
    state: 0,
    top: 50,
    touchDifference: 0,
    touchOffsetY: 0,
    touchTimeStamp: 0,
    uid: 1,
    uri: '',
    value: '',
    versionId: 0,
    warned: [],
    width: 600,
    workspaceUri: '',
  }

  const result = await focusFirst(state)

  expect(result.focusedIndex).toBe(0)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})
