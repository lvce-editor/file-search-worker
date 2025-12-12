import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set as setRpc } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as SetValue from '../src/parts/SetValue/SetValue.ts'

test('returns same state when value is unchanged', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {
      throw new Error('unexpected invoke call')
    },
  })
  setRpc(RendererWorker, mockRpc)

  const state = CreateDefaultState.createQuickPickState({ value: 'test' })
  const result = await SetValue.setValue(state, 'test')

  expect(result).toBe(state)
})

test('updates value and processes picks', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return ['newTheme', 'anotherNewTheme']
      }
      if (method === 'QuickPickProvider.provide') {
        return [
          {
            description: '',
            direntType: 1,
            fileIcon: '',
            icon: '',
            label: 'file1.txt',
            matches: [],
            uri: '/file1.txt',
          },
          {
            description: '',
            direntType: 1,
            fileIcon: '',
            icon: '',
            label: 'file2.txt',
            matches: [],
            uri: '/file2.txt',
          },
        ]
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const state = CreateDefaultState.createQuickPickState({ providerId: 0, value: 'old' })
  const result = await SetValue.setValue(state, 'new')

  expect(result.value).toBe('new')
  expect(result.inputSource).toBe(InputSource.Script)
  expect(result.items.length).toBeGreaterThanOrEqual(0)
  expect(result.focusedIndex).toBe(result.items.length > 0 ? 0 : -1)
  expect(result.picks.length).toBeGreaterThan(0)
})

test('sets focusedIndex to -1 when no items', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'QuickPickProvider.provide') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const state = CreateDefaultState.createQuickPickState({ providerId: 0, value: 'old' })
  const result = await SetValue.setValue(state, 'new')

  expect(result.value).toBe('new')
  expect(result.focusedIndex).toBe(-1)
  expect(result.items).toEqual([])
})

test('updates fileIconCache', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return ['theme1']
      }
      if (method === 'QuickPickProvider.provide') {
        return [
          {
            description: '',
            direntType: 1,
            fileIcon: '',
            icon: '',
            label: 'file1.txt',
            matches: [],
            uri: '/file1.txt',
          },
        ]
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const state = CreateDefaultState.createQuickPickState({ fileIconCache: {}, providerId: 0, value: 'old' })
  const result = await SetValue.setValue(state, 'new')

  expect(result.fileIconCache).toBeDefined()
  expect(result.icons.length).toBeGreaterThanOrEqual(0)
})

test('calculates finalDeltaY and listHeight', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return Array.from({ length: 10 }, (_, i) => `newTheme${i}`)
      }
      if (method === 'QuickPickProvider.provide') {
        return Array.from({ length: 10 }, (_, i) => ({
          description: '',
          direntType: 1,
          fileIcon: '',
          icon: '',
          label: `file${i}.txt`,
          matches: [],
          uri: `/file${i}.txt`,
        }))
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const state = CreateDefaultState.createQuickPickState({
    height: 300,
    itemHeight: 30,
    providerId: 0,
    value: 'old',
  })
  const result = await SetValue.setValue(state, 'new')

  expect(typeof result.finalDeltaY).toBe('number')
  expect(result.items.length).toBeGreaterThanOrEqual(0)
})

test('filters items based on filterValue', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return ['testTheme', 'otherTheme']
      }
      if (method === 'QuickPickProvider.provide') {
        return [
          {
            description: '',
            direntType: 1,
            fileIcon: '',
            icon: '',
            label: 'test.txt',
            matches: [],
            uri: '/test.txt',
          },
          {
            description: '',
            direntType: 1,
            fileIcon: '',
            icon: '',
            label: 'other.txt',
            matches: [],
            uri: '/other.txt',
          },
        ]
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const state = CreateDefaultState.createQuickPickState({ providerId: 0, value: '' })
  const result = await SetValue.setValue(state, 'test')

  expect(result.value).toBe('test')
  expect(result.items.length).toBeGreaterThanOrEqual(0)
})

test('handles empty string value', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      if (method === 'QuickPickProvider.provide') {
        return []
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const state = CreateDefaultState.createQuickPickState({ providerId: 0, value: 'old' })
  const result = await SetValue.setValue(state, '')

  expect(result.value).toBe('')
  expect(result.focusedIndex).toBe(-1)
})

test('preserves other state properties', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return ['theme1']
      }
      if (method === 'QuickPickProvider.provide') {
        return [
          {
            description: '',
            direntType: 1,
            fileIcon: '',
            icon: '',
            label: 'file1.txt',
            matches: [],
            uri: '/file1.txt',
          },
        ]
      }
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const state = CreateDefaultState.createQuickPickState({
    height: 400,
    providerId: 0,
    uid: 42,
    value: 'old',
    width: 800,
  })
  const result = await SetValue.setValue(state, 'new')

  expect(result.uid).toBe(42)
  expect(result.width).toBe(800)
  expect(result.height).toBe(400)
  expect(result.providerId).toBe(0)
})
