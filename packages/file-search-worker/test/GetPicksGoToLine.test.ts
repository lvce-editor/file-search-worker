import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { getPicks } from '../src/parts/GetPicksGoToLine/GetPicksGoToLine.ts'

test('returns instruction when value is ":"', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
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

  const result = await getPicks(':')
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

test('returns position preview when value starts with ":" and has number', async () => {
  const result = await getPicks(':2')
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: "Press 'Enter' to go to line 1 column 0",
    matches: [],
    uri: '',
  })
})

test('returns position preview for line 1', async () => {
  const result = await getPicks(':1')
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: "Press 'Enter' to go to line 0 column 0",
    matches: [],
    uri: '',
  })
})

test('returns empty array when value does not start with ":"', async () => {
  const result = await getPicks('')
  expect(result).toHaveLength(0)
})

test('returns empty array for non-colon value', async () => {
  const result = await getPicks('test')
  expect(result).toHaveLength(0)
})
