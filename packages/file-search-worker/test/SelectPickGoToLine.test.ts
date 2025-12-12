import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import * as SelectPickGoToLine from '../src/parts/SelectPickGoToLine/SelectPickGoToLine.ts'

test('selectPick with ::value parses column and navigates to position', async () => {
  const editorId = 123
  const lines = ['line 1', 'line 2', 'line 3']

  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
    'GetActiveEditor.getActiveEditorId': () => editorId,
  })

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

  const item = { label: '1' }
  const value = '::10'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(mockRpc.invocations).toEqual([
    ['GetActiveEditor.getActiveEditorId'],
    ['Editor.cursorSet', 1, 3],
    ['Editor.handleFocus'],
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick with ::value handles column at newline', async () => {
  const editorId = 456
  const lines = ['line 1', 'line 2']

  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
    'GetActiveEditor.getActiveEditorId': () => editorId,
  })

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

  const item = { label: '1' }
  const value = '::7'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(mockRpc.invocations).toEqual([
    ['GetActiveEditor.getActiveEditorId'],
    ['Editor.cursorSet', 1, 0],
    ['Editor.handleFocus'],
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick with ::value handles column 0', async () => {
  const editorId = 789
  const lines = ['line 1']

  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
    'GetActiveEditor.getActiveEditorId': () => editorId,
  })

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

  const item = { label: '1' }
  const value = '::0'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(mockRpc.invocations).toEqual([
    ['GetActiveEditor.getActiveEditorId'],
    ['Editor.cursorSet', 0, 0],
    ['Editor.handleFocus'],
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick without :: parses row from item.label', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
  })

  const item = { label: '5' }
  const value = '5'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(mockRpc.invocations).toEqual([
    ['Editor.cursorSet', 5, 0],
    ['Editor.handleFocus'],
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick without :: handles row 0', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
  })

  const item = { label: '0' }
  const value = '0'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(mockRpc.invocations).toEqual([
    ['Editor.cursorSet', 0, 0],
    ['Editor.handleFocus'],
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick without :: handles large row numbers', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
  })

  const item = { label: '100' }
  const value = '100'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(mockRpc.invocations).toEqual([
    ['Editor.cursorSet', 100, 0],
    ['Editor.handleFocus'],
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})
