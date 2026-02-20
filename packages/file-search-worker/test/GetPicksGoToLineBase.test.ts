import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { getPicksGoToLineBase } from '../src/parts/GetPicksGoToLineBase/GetPicksGoToLineBase.ts'

test('returns instruction with line count', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  const mockEditorRpc = createMockRpc({
    commandMap: {
      'Editor.getLines2': (editorId: number) => {
        if (editorId === 1) {
          return ['line1', 'line2', 'line3']
        }
        throw new Error(`unexpected editorId ${editorId}`)
      },
    },
  })
  EditorWorker.set(mockEditorRpc)

  const result = await getPicksGoToLineBase()
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Type a line number to go to (from 1 to 3)',
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
})

test('handles empty text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  const mockEditorRpc = createMockRpc({
    commandMap: {
      'Editor.getLines2': (editorId: number) => {
        if (editorId === 1) {
          return []
        }
        throw new Error(`unexpected editorId ${editorId}`)
      },
    },
  })
  EditorWorker.set(mockEditorRpc)

  const result = await getPicksGoToLineBase()
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Type a line number to go to (from 1 to 0)',
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
})

test('handles single line text', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  const mockEditorRpc = createMockRpc({
    commandMap: {
      'Editor.getLines2': (editorId: number) => {
        if (editorId === 1) {
          return ['hello world']
        }
        throw new Error(`unexpected editorId ${editorId}`)
      },
    },
  })
  EditorWorker.set(mockEditorRpc)

  const result = await getPicksGoToLineBase()
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Type a line number to go to (from 1 to 1)',
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
})
