import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as QuickPickEntryUri from '../src/parts/QuickPickEntryUri/QuickPickEntryUri.ts'
import * as QuickPickOpenState from '../src/parts/QuickPickOpenState/QuickPickOpenState.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set as setRpc } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as VirtualList from '../src/parts/VirtualList/VirtualList.ts'

const createDefaultState = (overrides: Partial<QuickPickState> = {}): QuickPickState => {
  const virtualList = VirtualList.create({ headerHeight: 38, itemHeight: 30, minimumSliderSize: 20 })
  return {
    ...virtualList,
    args: [],
    cursorOffset: 0,
    fileIconCache: Object.create(null),
    focused: false,
    focusedIndex: -1,
    height: 300,
    icons: [],
    inputSource: InputSource.User,
    items: [],
    maxVisibleItems: 10,
    picks: [],
    platform: 0,
    providerId: 0,
    recentPickIds: Object.create(null),
    recentPicks: [],
    scrollBarActive: false,
    state: QuickPickOpenState.Default,
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
    ...overrides,
  }
}

const createProtoVisibleItem = (label: string, uri: string = ''): ProtoVisibleItem => {
  return {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label,
    matches: [],
    uri: uri || label,
  }
}

test('loadContent returns state with loaded content', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }, { label: 'file2.txt' }]

  const state = createDefaultState({
    args: [null, customItems],
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.picks).toHaveLength(2)
  expect(result.items.length).toBeGreaterThan(0)
  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(0)
  expect(result.cursorOffset).toBe(result.value.length)
  expect(result.inputSource).toBe(InputSource.Script)
  expect(result.state).toBe(QuickPickOpenState.Finished)
  expect(result.providerId).toBeDefined()
  expect(result.icons).toBeDefined()
  expect(result.fileIconCache).toBeDefined()
})

test('loadContent handles empty picks', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const state = createDefaultState({
    args: [],
    uri: QuickPickEntryUri.View,
  })

  const result = await loadContent(state)

  expect(result.picks).toEqual([])
  expect(result.items).toEqual([])
  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(0)
  expect(result.minLineY).toBe(0)
  expect(result.maxLineY).toBe(0)
})

test('loadContent handles many picks', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = Array.from({ length: 100 }, (_, i) => ({
    label: `file${i}.txt`,
  }))

  const state = createDefaultState({
    args: [null, customItems],
    maxVisibleItems: 10,
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.picks).toHaveLength(100)
  expect(result.maxLineY).toBe(10)
  expect(result.minLineY).toBe(0)
})

test('loadContent respects maxVisibleItems', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = Array.from({ length: 50 }, (_, i) => ({
    label: `file${i}.txt`,
  }))

  const state = createDefaultState({
    args: [null, customItems],
    maxVisibleItems: 5,
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.picks).toHaveLength(50)
  expect(result.maxLineY).toBe(5)
  expect(result.minLineY).toBe(0)
})

test('loadContent handles file icon cache', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, { name }: { name: string }) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return `icon-for-${name}`
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }, { label: 'file2.txt' }]

  const existingCache = { '/file1.txt': 'cached-icon' }

  const state = createDefaultState({
    args: [null, customItems],
    fileIconCache: existingCache,
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.fileIconCache).toBeDefined()
  expect(result.fileIconCache).not.toBe(existingCache)
  expect(result.icons).toBeDefined()
  expect(result.icons.length).toBeGreaterThan(0)
})

test('loadContent handles different URIs', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'command1' }]

  const state = createDefaultState({
    args: [null, customItems],
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.providerId).toBeDefined()
  expect(result.value).toBeDefined()
})

test('loadContent calculates listHeight correctly', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }, { label: 'file2.txt' }, { label: 'file3.txt' }]

  const state = createDefaultState({
    args: [null, customItems],
    height: 300,
    itemHeight: 30,
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.items.length).toBeGreaterThan(0)
  expect(result.finalDeltaY).toBeDefined()
  expect(typeof result.finalDeltaY).toBe('number')
})

test('loadContent filters items based on filter value', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }, { label: 'file2.txt' }, { label: 'other.txt' }]

  const state = createDefaultState({
    args: [null, customItems],
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.picks).toHaveLength(3)
  expect(result.items).toBeDefined()
})

test('loadContent preserves args', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }]
  const args = ['arg1', customItems]

  const state = createDefaultState({
    args,
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.args).toEqual(args)
})

test('loadContent sets cursorOffset to value length', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }]

  const state = createDefaultState({
    args: [null, customItems],
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.cursorOffset).toBe(result.value.length)
})

test('loadContent sets focused to true', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }]

  const state = createDefaultState({
    args: [null, customItems],
    focused: false,
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.focused).toBe(true)
})

test('loadContent sets focusedIndex to 0', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }]

  const state = createDefaultState({
    args: [null, customItems],
    focusedIndex: 5,
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.focusedIndex).toBe(0)
})

test('loadContent sets inputSource to Script', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }]

  const state = createDefaultState({
    args: [null, customItems],
    inputSource: InputSource.User,
    uri: QuickPickEntryUri.Custom,
  })

  const result = await loadContent(state)

  expect(result.inputSource).toBe(InputSource.Script)
})

test('loadContent sets state to Finished', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }]

  const state = createDefaultState({
    uri: QuickPickEntryUri.Custom,
    args: [null, customItems],
    state: QuickPickOpenState.Default,
  })

  const result = await loadContent(state)

  expect(result.state).toBe(QuickPickOpenState.Finished)
})

test('loadContent handles picks less than maxVisibleItems', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [
    { label: 'file1.txt' },
    { label: 'file2.txt' },
  ]

  const state = createDefaultState({
    uri: QuickPickEntryUri.Custom,
    args: [null, customItems],
    maxVisibleItems: 10,
  })

  const result = await loadContent(state)

  expect(result.picks).toHaveLength(2)
  expect(result.maxLineY).toBe(2)
  expect(result.minLineY).toBe(0)
})

test('loadContent handles single pick', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }]

  const state = createDefaultState({
    uri: QuickPickEntryUri.Custom,
    args: [null, customItems],
  })

  const result = await loadContent(state)

  expect(result.picks).toHaveLength(1)
  expect(result.maxLineY).toBe(1)
  expect(result.minLineY).toBe(0)
  expect(result.focusedIndex).toBe(0)
})

test('loadContent calculates finalDeltaY for long lists', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = Array.from({ length: 20 }, (_, i) => ({
    label: `file${i}.txt`,
  }))

  const state = createDefaultState({
    uri: QuickPickEntryUri.Custom,
    args: [null, customItems],
    itemHeight: 30,
    height: 200,
  })

  const result = await loadContent(state)

  expect(result.finalDeltaY).toBeGreaterThan(0)
  expect(result.items.length).toBeGreaterThan(0)
})

test('loadContent calculates finalDeltaY for short lists', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }]

  const state = createDefaultState({
    uri: QuickPickEntryUri.Custom,
    args: [null, customItems],
    itemHeight: 30,
    height: 300,
  })

  const result = await loadContent(state)

  expect(result.finalDeltaY).toBe(0)
})

test('loadContent preserves other state properties', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'file1.txt' }]

  const state = createDefaultState({
    uri: QuickPickEntryUri.Custom,
    args: [null, customItems],
    uid: 42,
    width: 800,
    height: 400,
    top: 100,
    workspaceUri: '/workspace',
  })

  const result = await loadContent(state)

  expect(result.uid).toBe(42)
  expect(result.width).toBe(800)
  expect(result.height).toBe(400)
  expect(result.top).toBe(100)
  expect(result.workspaceUri).toBe('/workspace')
})

test('loadContent handles Custom URI', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const customItems = [{ label: 'custom1' }]

  const state = createDefaultState({
    uri: QuickPickEntryUri.Custom,
    args: [null, customItems],
  })

  const result = await loadContent(state)

  expect(result.providerId).toBeDefined()
  expect(result.picks).toHaveLength(1)
  expect(result.picks[0].label).toBe('custom1')
})

test('loadContent handles Recent URI', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return 'icon'
      }
      if (method === 'RecentlyOpened.getRecentlyOpened') {
        return ['file:///recent1']
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const state = createDefaultState({
    uri: QuickPickEntryUri.Recent,
    args: [],
  })

  const result = await loadContent(state)

  expect(result.providerId).toBeDefined()
  expect(result.picks).toBeDefined()
})
