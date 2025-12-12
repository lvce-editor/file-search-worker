import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as Close from '../src/parts/Close/Close.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('close calls closeWidget with correct uid', async () => {
  let invokedMethod: string | undefined
  let invokedArgs: readonly unknown[] | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      invokedMethod = method
      invokedArgs = args
    },
  })
  set(RendererWorker, mockRpc)

  const state: QuickPickState = {
    args: [],
    cursorOffset: 0,
    deltaY: 0,
    fileIconCache: {},
    finalDeltaY: 0,
    focused: false,
    focusedIndex: 0,
    handleOffset: 0,
    headerHeight: 0,
    height: 0,
    icons: [],
    inputSource: 0,
    itemHeight: 0,
    items: [],
    maxLineY: 0,
    maxVisibleItems: 0,
    minimumSliderSize: 0,
    minLineY: 0,
    picks: [],
    platform: 0,
    providerId: 0,
    recentPickIds: new Map(),
    recentPicks: [],
    scrollBarActive: false,
    scrollBarHeight: 0,
    scrollBarY: 0,
    state: 0,
    top: 0,
    touchDifference: 0,
    touchOffsetY: 0,
    touchTimeStamp: 0,
    uid: 123,
    uri: '',
    value: '',
    versionId: 0,
    warned: [],
    width: 0,
    workspaceUri: '',
    x: 0,
    y: 0,
  }

  const result = await Close.close(state)

  expect(invokedMethod).toBe('Viewlet.closeWidget')
  expect(invokedArgs).toEqual([123])
  expect(result).toBe(state)
})

test('close returns the same state object', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async () => {
      // no-op
    },
  })
  set(RendererWorker, mockRpc)

  const state: QuickPickState = {
    args: [],
    cursorOffset: 0,
    deltaY: 0,
    fileIconCache: {},
    finalDeltaY: 0,
    focused: false,
    focusedIndex: 0,
    handleOffset: 0,
    headerHeight: 0,
    height: 0,
    icons: [],
    inputSource: 0,
    itemHeight: 0,
    items: [],
    maxLineY: 0,
    maxVisibleItems: 0,
    minimumSliderSize: 0,
    minLineY: 0,
    picks: [],
    platform: 0,
    providerId: 0,
    recentPickIds: new Map(),
    recentPicks: [],
    scrollBarActive: false,
    scrollBarHeight: 0,
    scrollBarY: 0,
    state: 0,
    top: 0,
    touchDifference: 0,
    touchOffsetY: 0,
    touchTimeStamp: 0,
    uid: 456,
    uri: '',
    value: '',
    versionId: 0,
    warned: [],
    width: 0,
    workspaceUri: '',
    x: 0,
    y: 0,
  }

  const result = await Close.close(state)

  expect(result).toBe(state)
})
