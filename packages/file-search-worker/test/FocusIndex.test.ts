import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import { focusIndex } from '../src/parts/FocusIndex/FocusIndex.ts'
import { set as setRpc } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as VirtualList from '../src/parts/VirtualList/VirtualList.ts'

test('focusIndex updates focusedIndex when index is within visible range', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, { name }: { name: string }) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return `icon-for-${name}`
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file4.txt', matches: [], uri: '/file4.txt' },
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
    maxLineY: 3,
    maxVisibleItems: 10,
    minLineY: 0,
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

  const result = await focusIndex(state, 1)

  expect(result.focusedIndex).toBe(1)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(3)
  expect(result.icons.length).toBe(3)
})

test('focusIndex scrolls up when index is before minLineY', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, { name }: { name: string }) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return `icon-for-${name}`
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file4.txt', matches: [], uri: '/file4.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file5.txt', matches: [], uri: '/file5.txt' },
  ]

  const virtualList = VirtualList.create({ headerHeight: 38, itemHeight: 20, minimumSliderSize: 20 })
  const state: QuickPickState = {
    ...virtualList,
    args: [],
    cursorOffset: 0,
    fileIconCache: {},
    focused: false,
    focusedIndex: 3,
    height: 300,
    icons: [],
    inputSource: 0,
    items,
    maxLineY: 4,
    maxVisibleItems: 3,
    minLineY: 2,
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

  const result = await focusIndex(state, 0)

  expect(result.focusedIndex).toBe(0)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(3)
  expect(result.icons.length).toBe(3)
})

test('focusIndex scrolls down when index is at or after maxLineY', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, { name }: { name: string }) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return `icon-for-${name}`
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file3.txt', matches: [], uri: '/file3.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file4.txt', matches: [], uri: '/file4.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file5.txt', matches: [], uri: '/file5.txt' },
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
    maxLineY: 2,
    maxVisibleItems: 3,
    minLineY: 0,
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

  const result = await focusIndex(state, 4)

  expect(result.focusedIndex).toBe(4)
  expect(result.minLineY).toBe(2)
  expect(result.maxLineY).toBe(5)
  expect(result.icons.length).toBe(3)
})

test('focusIndex handles edge case when scrolling up with maxVisibleItems larger than remaining items', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, { name }: { name: string }) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return `icon-for-${name}`
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

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
    maxLineY: 1,
    maxVisibleItems: 10,
    minLineY: 0,
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

  const result = await focusIndex(state, 0)

  expect(result.focusedIndex).toBe(0)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(1)
})

test('focusIndex handles edge case when scrolling down with maxVisibleItems larger than remaining items', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, { name }: { name: string }) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return `icon-for-${name}`
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

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
    focusedIndex: 0,
    height: 300,
    icons: [],
    inputSource: 0,
    items,
    maxLineY: 1,
    maxVisibleItems: 10,
    minLineY: 0,
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

  const result = await focusIndex(state, 1)

  expect(result.focusedIndex).toBe(1)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(2)
})

test('focusIndex updates fileIconCache', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, { name }: { name: string }) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return `icon-for-${name}`
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  const items = [
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file1.txt', matches: [], uri: '/file1.txt' },
    { description: '', direntType: 1, fileIcon: '', icon: '', label: 'file2.txt', matches: [], uri: '/file2.txt' },
  ]

  const virtualList = VirtualList.create({ headerHeight: 38, itemHeight: 20, minimumSliderSize: 20 })
  const state: QuickPickState = {
    ...virtualList,
    args: [],
    cursorOffset: 0,
    fileIconCache: { '/file1.txt': 'cached-icon' },
    focused: false,
    focusedIndex: 0,
    height: 300,
    icons: [],
    inputSource: 0,
    items,
    maxLineY: 1,
    maxVisibleItems: 10,
    minLineY: 0,
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

  const result = await focusIndex(state, 1)

  expect(result.fileIconCache).toEqual({
    '/file1.txt': 'cached-icon',
    '/file2.txt': 'icon-for-file2.txt',
  })
})
