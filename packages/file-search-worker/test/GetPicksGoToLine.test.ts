import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
<<<<<<< HEAD
import * as GetPicksGoToLine from '../src/parts/GetPicksGoToLine/GetPicksGoToLine.ts'

test('getPicks returns instruction when value is "::"', async () => {
  const text = 'line 1\nline 2\nline 3'
=======
import { getPicks } from '../src/parts/GetPicksGoToLine/GetPicksGoToLine.ts'

test('returns instruction when value is "::"', async () => {
>>>>>>> origin/main
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
<<<<<<< HEAD
        return 123
=======
        return 1
>>>>>>> origin/main
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
<<<<<<< HEAD
    invoke: (method: string, id: number) => {
      if (method === 'Editor.getLines2' && id === 123) {
        return ['line 1', 'line 2', 'line 3']
      }
      throw new Error(`unexpected method ${method}`)
=======
    invoke: (method: string, editorId: number) => {
      if (method === 'Editor.getLines2' && editorId === 1) {
        return ['line1', 'line2', 'line3']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
>>>>>>> origin/main
    },
  })
  EditorWorker.set(mockEditorRpc)

<<<<<<< HEAD
  const result = await GetPicksGoToLine.getPicks('::')

=======
  const result = await getPicks('::')
>>>>>>> origin/main
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
<<<<<<< HEAD
    label: `Type a character position to go to (from 1 to ${text.length})`,
=======
    label: 'Type a character position to go to (from 1 to 17)',
>>>>>>> origin/main
    matches: [],
    uri: '',
  })
})

<<<<<<< HEAD
test('getPicks returns position info when value starts with "::"', async () => {
=======
test('returns position preview when value starts with "::" and has number', async () => {
>>>>>>> origin/main
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
<<<<<<< HEAD
        return 123
=======
        return 1
>>>>>>> origin/main
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
<<<<<<< HEAD
    invoke: (method: string, id: number) => {
      if (method === 'Editor.getLines2' && id === 123) {
        return ['line 1', 'line 2', 'line 3']
      }
      throw new Error(`unexpected method ${method}`)
=======
    invoke: (method: string, editorId: number) => {
      if (method === 'Editor.getLines2' && editorId === 1) {
        return ['hello', 'world', 'test']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
>>>>>>> origin/main
    },
  })
  EditorWorker.set(mockEditorRpc)

<<<<<<< HEAD
  const result = await GetPicksGoToLine.getPicks('::10')

  expect(result).toHaveLength(1)
  expect(result[0].label).toBe("Press 'Enter' to go to line 1 column 3")
})

test('getPicks returns position info for column at newline', async () => {
=======
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
>>>>>>> origin/main
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
<<<<<<< HEAD
        return 123
=======
        return 1
>>>>>>> origin/main
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
<<<<<<< HEAD
    invoke: (method: string, id: number) => {
      if (method === 'Editor.getLines2' && id === 123) {
        return ['line 1', 'line 2']
      }
      throw new Error(`unexpected method ${method}`)
=======
    invoke: (method: string, editorId: number) => {
      if (method === 'Editor.getLines2' && editorId === 1) {
        return ['first line', 'second line', 'third line']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
>>>>>>> origin/main
    },
  })
  EditorWorker.set(mockEditorRpc)

<<<<<<< HEAD
  const result = await GetPicksGoToLine.getPicks('::6')

  expect(result).toHaveLength(1)
  expect(result[0].label).toBe("Press 'Enter' to go to line 0 column 6")
})

test('getPicks returns position info for column after newline', async () => {
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return 123
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, id: number) => {
      if (method === 'Editor.getLines2' && id === 123) {
        return ['line 1', 'line 2']
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  const result = await GetPicksGoToLine.getPicks('::7')

  expect(result).toHaveLength(1)
  expect(result[0].label).toBe("Press 'Enter' to go to line 1 column 0")
})

test('getPicks returns default picks for other values', async () => {
  const result = await GetPicksGoToLine.getPicks('test')

=======
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
>>>>>>> origin/main
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

<<<<<<< HEAD
test('getPicks returns default picks for empty value', async () => {
  const result = await GetPicksGoToLine.getPicks('')

=======
test('returns default picks for non-colon value', async () => {
  const result = await getPicks('test')
>>>>>>> origin/main
  expect(result).toHaveLength(6)
  expect(result[0].label).toBe('1')
  expect(result[5].label).toBe('6')
})
