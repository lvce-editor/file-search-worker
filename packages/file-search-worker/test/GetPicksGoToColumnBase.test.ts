import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { getPicksGoToColumnBase } from '../src/parts/GetPicksGoToColumnBase/GetPicksGoToColumnBase.ts'

test('returns instruction with text length', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, editorId: number) => {
      if (method === 'Editor.getLines2' && editorId === 1) {
        return ['line1', 'line2', 'line3']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  const result = await getPicksGoToColumnBase()
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Type a character position to go to (from 1 to 17)',
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
})

test('handles empty text', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, editorId: number) => {
      if (method === 'Editor.getLines2' && editorId === 1) {
        return []
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  const result = await getPicksGoToColumnBase()
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Type a character position to go to (from 1 to 0)',
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
})

test('handles single line text', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => 1,
  })

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, editorId: number) => {
      if (method === 'Editor.getLines2' && editorId === 1) {
        return ['hello world']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  const result = await getPicksGoToColumnBase()
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'Type a character position to go to (from 1 to 11)',
    matches: [],
    uri: '',
  })
  expect(mockRpc.invocations).toEqual([['GetActiveEditor.getActiveEditorId']])
})
