import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

const createDefaultState = (overrides: Partial<QuickPickState> = {}): QuickPickState => {
  return {
    args: [],
    cursorOffset: 0,
    deltaY: 0,
    fileIconCache: Object.create(null),
    finalDeltaY: 0,
    focused: false,
    focusedIndex: -1,
    handleOffset: 0,
    headerHeight: 38,
    height: 300,
    icons: [],
    inputSource: InputSource.Script,
    itemHeight: 30,
    items: [],
    maxLineY: 0,
    maxVisibleItems: 10,
    minLineY: 0,
    minimumSliderSize: 20,
    picks: [],
    platform: 0,
    providerId: 0,
    recentPickIds: Object.create(null),
    recentPicks: [],
    scrollBarActive: false,
    scrollBarHeight: 0,
    scrollBarY: 0,
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
    x: 0,
    y: 0,
    ...overrides,
  }
}

test('returns state unchanged when value is the same', async () => {
  const state = createDefaultState({ value: 'test' })
  const result = await HandleInput.handleInput(state, 'test', 5, InputSource.User)
  expect(result).toBe(state)
})

test('calls SetValue.setValue and updates cursorOffset and inputSource', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'GetQuickPickFileIcons.getQuickPickFileIcons') {
        return { icons: [], newFileIconCache: Object.create(null) }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RendererWorker, mockRpc)

  const state = createDefaultState({ value: 'old' })
  const newValue = 'new'
  const cursorOffset = 3
  const inputSource = InputSource.User

  const result = await HandleInput.handleInput(state, newValue, cursorOffset, inputSource)

  expect(result.value).toBe(newValue)
  expect(result.cursorOffset).toBe(cursorOffset)
  expect(result.inputSource).toBe(inputSource)
  expect(result).not.toBe(state)
})

test('uses default inputSource when not provided', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'GetQuickPickFileIcons.getQuickPickFileIcons') {
        return { icons: [], newFileIconCache: Object.create(null) }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RendererWorker, mockRpc)

  const state = createDefaultState({ value: 'old' })
  const newValue = 'new'
  const cursorOffset = 2

  const result = await HandleInput.handleInput(state, newValue, cursorOffset)

  expect(result.value).toBe(newValue)
  expect(result.cursorOffset).toBe(cursorOffset)
  expect(result.inputSource).toBe(InputSource.Script)
})

test('preserves other state properties from SetValue.setValue result', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'GetQuickPickFileIcons.getQuickPickFileIcons') {
        return { icons: [], newFileIconCache: Object.create(null) }
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RendererWorker, mockRpc)

  const state = createDefaultState({ height: 500, uid: 42, value: 'old' })
  const newValue = 'new'
  const cursorOffset = 1

  const result = await HandleInput.handleInput(state, newValue, cursorOffset)

  expect(result.uid).toBe(42)
  expect(result.height).toBe(500)
  expect(result.value).toBe(newValue)
  expect(result.cursorOffset).toBe(cursorOffset)
})
