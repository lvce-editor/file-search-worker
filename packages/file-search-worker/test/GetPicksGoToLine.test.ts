import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { getPicks } from '../src/parts/GetPicksGoToLine/GetPicksGoToLine.ts'

test('returns instruction when value is "::"', async () => {
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return 1
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

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

  const result = await getPicks('::')
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
})

test('returns position preview when value starts with "::" and has number', async () => {
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return 1
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, editorId: number) => {
      if (method === 'Editor.getLines2' && editorId === 1) {
        return ['hello', 'world', 'test']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  const result = await getPicks('::5')
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: "Press 'Enter' to go to line 0 column 5",
    matches: [],
    uri: '',
  })
})

test('returns position preview for multi-line text', async () => {
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return 1
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, editorId: number) => {
      if (method === 'Editor.getLines2' && editorId === 1) {
        return ['first line', 'second line', 'third line']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  const result = await getPicks('::15')
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: "Press 'Enter' to go to line 1 column 4",
    matches: [],
    uri: '',
  })
})

test('returns default picks when value does not start with "::"', async () => {
  const result = await getPicks('')
  expect(result).toHaveLength(6)
  expect(result[0]).toEqual({
    description: '',
    direntType: DirentType.None,
    fileIcon: '',
    icon: '',
    label: '1',
    matches: [],
    uri: '',
  })
  expect(result[1].label).toBe('2')
  expect(result[2].label).toBe('3')
  expect(result[3].label).toBe('4')
  expect(result[4].label).toBe('5')
  expect(result[5].label).toBe('6')
})

test('returns default picks for non-colon value', async () => {
  const result = await getPicks('test')
  expect(result).toHaveLength(6)
  expect(result[0].label).toBe('1')
  expect(result[5].label).toBe('6')
})
