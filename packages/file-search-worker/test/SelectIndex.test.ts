import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { selectIndex } from '../src/parts/SelectIndex/SelectIndex.ts'

const createMockState = (items: ProtoVisibleItem[], minLineY = 0, providerId = QuickPickEntryId.Commands, value = ''): QuickPickState => {
  return {
    items,
    minLineY,
    providerId,
    uid: 123,
    value,
  } as QuickPickState
}

test('selectIndex returns state when pick is not found', async () => {
  const items: ProtoVisibleItem[] = []
  const state = createMockState(items, 0)
  const result = await selectIndex(state, 0)
  expect(result).toBe(state)
})

test('selectIndex calls select function and returns state for Hide command', async () => {
  let closeWidgetCalled = false
  let closeWidgetId: number | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async () => {},
    closeWidget: async (id: number) => {
      closeWidgetCalled = true
      closeWidgetId = id
    },
  })
  set(RendererWorker, mockRpc)

  const items: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'test',
      matches: [],
      uri: '',
    } as any,
  ]
  const state = createMockState(items, 0, QuickPickEntryId.Commands, '>')
  const result = await selectIndex(state, 0)

  expect(closeWidgetCalled).toBe(true)
  expect(closeWidgetId).toBe(123)
  expect(result).toBe(state)
})

test('selectIndex handles default command case', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async () => {},
  })
  set(RendererWorker, mockRpc)

  const items: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'test',
      matches: [],
      uri: '',
    } as any,
  ]
  const state = createMockState(items, 0, QuickPickEntryId.Commands, '>')
  const result = await selectIndex(state, 0)

  expect(result).toBe(state)
})

test('selectIndex calculates actualIndex correctly with minLineY', async () => {
  let closeWidgetCalled = false

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async () => {},
    closeWidget: async () => {
      closeWidgetCalled = true
    },
  })
  set(RendererWorker, mockRpc)

  const items: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'first',
      matches: [],
      uri: '',
    } as any,
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'second',
      matches: [],
      uri: '',
    } as any,
  ]
  const state = createMockState(items, 5, QuickPickEntryId.Commands, '>')
  const result = await selectIndex(state, 0)

  expect(closeWidgetCalled).toBe(true)
  expect(result).toBe(state)
})
