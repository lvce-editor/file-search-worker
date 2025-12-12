<<<<<<< HEAD
import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetText from '../src/parts/GetText/GetText.ts'

test('returns joined lines from active editor', async () => {
  const editorId = 123
  const lines = ['line 1', 'line 2', 'line 3']

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return editorId
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, id: number) => {
      if (method === 'Editor.getLines2' && id === editorId) {
        return lines
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
=======
import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import * as GetText from '../src/parts/GetText/GetText.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('returns joined lines from active editor', async () => {
  const mockRendererInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()
  const mockEditorInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()

  RendererWorker.registerMockRpc(mockRendererInvoke)
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: mockEditorInvoke,
  })

  EditorWorker.set(mockEditorRpc)

  const editorId = 123
  const lines = ['line 1', 'line 2', 'line 3']

  mockRendererInvoke.mockResolvedValue(editorId)
  mockEditorInvoke.mockResolvedValue(lines)
>>>>>>> origin/main

  const result = await GetText.getText()

  expect(result).toBe('line 1\nline 2\nline 3')
<<<<<<< HEAD
})

test('handles empty lines array', async () => {
  const editorId = 456
  const lines: string[] = []

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return editorId
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, id: number) => {
      if (method === 'Editor.getLines2' && id === editorId) {
        return lines
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
=======
  expect(mockRendererInvoke).toHaveBeenCalledWith('GetActiveEditor.getActiveEditorId')
  expect(mockEditorInvoke).toHaveBeenCalledWith('Editor.getLines2', editorId)
})

test('handles empty lines array', async () => {
  const mockRendererInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()
  const mockEditorInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()

  RendererWorker.registerMockRpc(mockRendererInvoke)
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: mockEditorInvoke,
  })

  EditorWorker.set(mockEditorRpc)

  const editorId = 456
  const lines: string[] = []

  mockRendererInvoke.mockResolvedValue(editorId)
  mockEditorInvoke.mockResolvedValue(lines)
>>>>>>> origin/main

  const result = await GetText.getText()

  expect(result).toBe('')
<<<<<<< HEAD
})

test('handles single line', async () => {
  const editorId = 789
  const lines = ['single line']

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return editorId
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, id: number) => {
      if (method === 'Editor.getLines2' && id === editorId) {
        return lines
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
=======
  expect(mockRendererInvoke).toHaveBeenCalledWith('GetActiveEditor.getActiveEditorId')
  expect(mockEditorInvoke).toHaveBeenCalledWith('Editor.getLines2', editorId)
})

test('handles single line', async () => {
  const mockRendererInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()
  const mockEditorInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()

  RendererWorker.registerMockRpc(mockRendererInvoke)
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: mockEditorInvoke,
  })

  EditorWorker.set(mockEditorRpc)

  const editorId = 789
  const lines = ['single line']

  mockRendererInvoke.mockResolvedValue(editorId)
  mockEditorInvoke.mockResolvedValue(lines)
>>>>>>> origin/main

  const result = await GetText.getText()

  expect(result).toBe('single line')
<<<<<<< HEAD
})

test('handles lines with empty strings', async () => {
  const editorId = 101
  const lines = ['line 1', '', 'line 3', '']

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return editorId
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, id: number) => {
      if (method === 'Editor.getLines2' && id === editorId) {
        return lines
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)
=======
  expect(mockRendererInvoke).toHaveBeenCalledWith('GetActiveEditor.getActiveEditorId')
  expect(mockEditorInvoke).toHaveBeenCalledWith('Editor.getLines2', editorId)
})

test('handles lines with empty strings', async () => {
  const mockRendererInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()
  const mockEditorInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()

  RendererWorker.registerMockRpc(mockRendererInvoke)
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: mockEditorInvoke,
  })

  EditorWorker.set(mockEditorRpc)

  const editorId = 101
  const lines = ['line 1', '', 'line 3', '']

  mockRendererInvoke.mockResolvedValue(editorId)
  mockEditorInvoke.mockResolvedValue(lines)
>>>>>>> origin/main

  const result = await GetText.getText()

  expect(result).toBe('line 1\n\nline 3\n')
<<<<<<< HEAD
})

test('handles error from getActiveEditorId', async () => {
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        throw new Error('Failed to get active editor')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: () => {
      throw new Error('should not be called')
    },
  })
  EditorWorker.set(mockEditorRpc)

  await expect(GetText.getText()).rejects.toThrow('Failed to get active editor')
})

test('handles error from getLines', async () => {
  const editorId = 202

  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'GetActiveEditor.getActiveEditorId') {
        return editorId
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, id: number) => {
      if (method === 'Editor.getLines2' && id === editorId) {
        throw new Error('Failed to get lines')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  await expect(GetText.getText()).rejects.toThrow('Failed to get lines')
=======
  expect(mockRendererInvoke).toHaveBeenCalledWith('GetActiveEditor.getActiveEditorId')
  expect(mockEditorInvoke).toHaveBeenCalledWith('Editor.getLines2', editorId)
})

test('handles error from getActiveEditorId', async () => {
  const mockRendererInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()
  const mockEditorInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()

  RendererWorker.registerMockRpc(mockRendererInvoke)
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: mockEditorInvoke,
  })

  EditorWorker.set(mockEditorRpc)

  mockRendererInvoke.mockRejectedValue(new Error('Failed to get active editor'))

  await expect(GetText.getText()).rejects.toThrow('Failed to get active editor')
  expect(mockRendererInvoke).toHaveBeenCalledWith('GetActiveEditor.getActiveEditorId')
  expect(mockEditorInvoke).not.toHaveBeenCalled()
})

test('handles error from getLines', async () => {
  const mockRendererInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()
  const mockEditorInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()

  RendererWorker.registerMockRpc(mockRendererInvoke)
  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: mockEditorInvoke,
  })

  EditorWorker.set(mockEditorRpc)

  const editorId = 202
  mockRendererInvoke.mockResolvedValue(editorId)
  mockEditorInvoke.mockRejectedValue(new Error('Failed to get lines'))

  await expect(GetText.getText()).rejects.toThrow('Failed to get lines')
  expect(mockRendererInvoke).toHaveBeenCalledWith('GetActiveEditor.getActiveEditorId')
  expect(mockEditorInvoke).toHaveBeenCalledWith('Editor.getLines2', editorId)
>>>>>>> origin/main
})
