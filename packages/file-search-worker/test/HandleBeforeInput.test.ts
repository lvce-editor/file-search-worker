import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleBeforeInput from '../src/parts/HandleBeforeInput/HandleBeforeInput.ts'
import * as InputEventType from '../src/parts/InputEventType/InputEventType.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('inserts text and updates state', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'hello' })
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertText, ' world', 5, 5)

  expect(result.value).toBe('hello world')
  expect(result.cursorOffset).toBe(11)
  expect(result.inputSource).toBe(InputSource.User)
})

test('replaces selected text', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'hello world' })
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertText, 'hi', 0, 5)

  expect(result.value).toBe('hi world')
  expect(result.cursorOffset).toBe(2)
  expect(result.inputSource).toBe(InputSource.User)
})

test('deletes character backward', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'hello' })
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.DeleteContentBackward, '', 5, 5)

  expect(result.value).toBe('hell')
  expect(result.cursorOffset).toBe(4)
  expect(result.inputSource).toBe(InputSource.User)
})

test('deletes character forward', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'hello' })
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.DeleteContentForward, '', 0, 0)

  expect(result.value).toBe('ello')
  expect(result.cursorOffset).toBe(0)
  expect(result.inputSource).toBe(InputSource.User)
})

test('deletes word backward', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'hello world' })
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.DeleteWordBackward, '', 11, 11)

  expect(result.value).toBe('hello')
  expect(result.cursorOffset).toBe(5)
  expect(result.inputSource).toBe(InputSource.User)
})

test('deletes word forward', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'hello world' })
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.DeleteWordForward, '', 0, 0)

  expect(result.value).toBe(' world')
  expect(result.cursorOffset).toBe(0)
  expect(result.inputSource).toBe(InputSource.User)
})

test('handles composition text', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'hello' })
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertCompositionText, ' world', 5, 5)

  expect(result.value).toBe('hello world')
  expect(result.cursorOffset).toBe(11)
  expect(result.inputSource).toBe(InputSource.User)
})

test('handles line break', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'hello\nworld' })
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertLineBreak, '', 5, 5)

  expect(result.value).toBe('hello\nworld')
  expect(result.cursorOffset).toBe(0)
  expect(result.inputSource).toBe(InputSource.User)
  expect(result).toBe(state)
})

test('handles insert from paste', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({ value: 'hello' })
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertFromPaste, ' world', 5, 5)

  expect(result.value).toBe('hello world')
  expect(result.cursorOffset).toBe(11)
  expect(result.inputSource).toBe(InputSource.User)
})

test('preserves other state properties', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({
    height: 500,
    providerId: 0,
    uid: 42,
    value: 'old',
  })
  const result = await HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertText, 'new', 3, 3)

  expect(result.uid).toBe(42)
  expect(result.height).toBe(500)
  expect(result.value).toBe('oldnew')
  expect(result.inputSource).toBe(InputSource.User)
})

test('throws error for invalid inputType', async () => {
  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'test' })
  await expect(HandleBeforeInput.handleBeforeInput(state, null as unknown as string, '', 0, 0)).rejects.toThrow()
})

test('throws error for invalid selectionStart', () => {
  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'test' })
  expect(() => {
    HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertText, '', 'invalid' as unknown as number, 0)
  }).toThrow()
})

test('throws error for invalid selectionEnd', () => {
  const state = CreateDefaultState.createDefaultState({ providerId: 0, value: 'test' })
  expect(() => {
    HandleBeforeInput.handleBeforeInput(state, InputEventType.InsertText, '', 0, 'invalid' as unknown as number)
  }).toThrow()
})
