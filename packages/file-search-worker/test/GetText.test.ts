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

  const result = await GetText.getText()

  expect(result).toBe('line 1\nline 2\nline 3')
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

  const result = await GetText.getText()

  expect(result).toBe('')
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

  const result = await GetText.getText()

  expect(result).toBe('single line')
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

  const result = await GetText.getText()

  expect(result).toBe('line 1\n\nline 3\n')
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
})
