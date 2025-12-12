import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import { selectIndex } from '../src/parts/SelectIndex/SelectIndex.ts'

test('selectIndex returns state when pick is not found', async () => {
  const items: ProtoVisibleItem[] = []
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '',
  }
  const result = await selectIndex(state, 0)
  expect(result).toBe(state)
})

test('selectIndex calls select function and returns state for Hide command', async () => {
  let closeWidgetCalled = false
  let closeWidgetId: number | undefined

  const mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.closeWidget': (id: number) => {
      closeWidgetCalled = true
      closeWidgetId = id
    },
  })

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
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectIndex(state, 0)

  expect(closeWidgetCalled).toBe(true)
  expect(closeWidgetId).toBe(123)
  expect(result).toBe(state)
})

test('selectIndex handles default command case', async () => {
  RendererWorker.registerMockRpc({})

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
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 0,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectIndex(state, 0)

  expect(result).toBe(state)
})

test('selectIndex calculates actualIndex correctly with minLineY', async () => {
  let closeWidgetCalled = false

  RendererWorker.registerMockRpc({
    'Viewlet.closeWidget': () => {
      closeWidgetCalled = true
    },
  })

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
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'fourth',
      matches: [],
      uri: '',
    } as any,
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'fifth',
      matches: [],
      uri: '',
    } as any,
    {
      description: '',
      direntType: 1,
      fileIcon: '',
      icon: '',
      id: 'test-command',
      label: 'sixth',
      matches: [],
      uri: '',
    } as any,
  ]
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    items,
    minLineY: 5,
    providerId: QuickPickEntryId.Commands,
    uid: 123,
    value: '>',
  }
  const result = await selectIndex(state, 0)

  expect(closeWidgetCalled).toBe(true)
  expect(result).toBe(state)
})
