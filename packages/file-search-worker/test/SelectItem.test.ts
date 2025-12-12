import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { selectItem } from '../src/parts/SelectItem/SelectItem.ts'

const createMockState = (items: ProtoVisibleItem[]): QuickPickState => {
  return {
    args: [],
    cursorOffset: 0,
    deltaY: 0,
    fileIconCache: Object.create(null),
    finalDeltaY: 0,
    focused: false,
    focusedIndex: -1,
    handleOffset: 0,
    headerHeight: 0,
    height: 0,
    icons: [],
    inputSource: 0,
    itemHeight: 0,
    items,
    maxLineY: 0,
    maxVisibleItems: 0,
    minimumSliderSize: 0,
    minLineY: 0,
    picks: [],
    platform: 0,
    providerId: QuickPickEntryId.Commands,
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
    value: '>',
    versionId: 0,
    warned: [],
    width: 0,
    workspaceUri: '',
    x: 0,
    y: 0,
  }
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
    invoke: async (method: string) => {
      if (method === 'Viewlet.closeWidget') {
        closeWidgetCalled = true
      }
    },
  })
  set(RpcId.RendererWorker, mockRpc)

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
