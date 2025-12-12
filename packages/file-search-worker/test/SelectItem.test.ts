import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { selectItem } from '../src/parts/SelectItem/SelectItem.ts'

const createMockState = (items: ProtoVisibleItem[]): QuickPickState => {
  return {
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  } as QuickPickState
}

test('selectItem returns state when label is not found', async () => {
  const items: ProtoVisibleItem[] = [
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      label: 'first',
      matches: [],
      uri: '',
    },
  ]
  const state = createMockState(items)
  const result = await selectItem(state, 'nonexistent')
  expect(result).toBe(state)
})

test('selectItem calls selectIndex with correct index when label is found', async () => {
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
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'third',
      matches: [],
      uri: '',
    } as any,
  ]
  const state = createMockState(items)
  const result = await selectItem(state, 'second')

  expect(closeWidgetCalled).toBe(true)
  expect(result).toBe(state)
})

test('selectItem handles empty items array', async () => {
  const items: ProtoVisibleItem[] = []
  const state = createMockState(items)
  const result = await selectItem(state, 'test')
  expect(result).toBe(state)
})
