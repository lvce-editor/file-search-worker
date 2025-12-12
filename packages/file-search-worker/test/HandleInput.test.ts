import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('returns state unchanged when value is the same', async () => {
  const state = CreateDefaultState.createQuickPickState({ value: 'test' })
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

  const state = CreateDefaultState.createQuickPickState({ value: 'old' })
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

  const state = CreateDefaultState.createQuickPickState({ value: 'old' })
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

  const state = CreateDefaultState.createQuickPickState({ height: 500, uid: 42, value: 'old' })
  const newValue = 'new'
  const cursorOffset = 1

  const result = await HandleInput.handleInput(state, newValue, cursorOffset)

  expect(result.uid).toBe(42)
  expect(result.height).toBe(500)
  expect(result.value).toBe(newValue)
  expect(result.cursorOffset).toBe(cursorOffset)
})
