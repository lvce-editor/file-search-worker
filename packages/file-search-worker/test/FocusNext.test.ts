import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import { focusNext } from '../src/parts/FocusNext/FocusNext.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set as setRpc } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as VirtualList from '../src/parts/VirtualList/VirtualList.ts'

test('focusNext focuses the next item', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
  ]

  const virtualList = VirtualList.create({ headerHeight: 38, itemHeight: 20, minimumSliderSize: 20 })
  const state: QuickPickState = {
    ...virtualList,
    args: [],
    cursorOffset: 0,
    fileIconCache: {},
    focused: false,
    focusedIndex: 0,
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

  const result = await focusNext(state)

  expect(result.focusedIndex).toBe(1)
})

test('focusNext cycles to first item when at last', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

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

  const result = await focusNext(state)

  expect(result.focusedIndex).toBe(0)
})
