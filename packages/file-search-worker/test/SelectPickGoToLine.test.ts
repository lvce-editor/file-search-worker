import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import * as SelectPickGoToLine from '../src/parts/SelectPickGoToLine/SelectPickGoToLine.ts'

test('selectPick with ::value parses column and navigates to position', async () => {
  const editorId = 123
  const lines = ['line 1', 'line 2', 'line 3']
  let capturedRowIndex: number | undefined
  let capturedColumnIndex: number | undefined
  let handleFocusCalled = false

  RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => editorId,
    'Editor.cursorSet': (rowIndex: number, columnIndex: number) => {
      capturedRowIndex = rowIndex
      capturedColumnIndex = columnIndex
    },
    'Editor.handleFocus': () => {
      handleFocusCalled = true
    },
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

  expect(capturedRowIndex).toBe(1)
  expect(capturedColumnIndex).toBe(3)
  expect(handleFocusCalled).toBe(true)
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick with ::value handles column at newline', async () => {
  const editorId = 456
  const lines = ['line 1', 'line 2']
  let capturedRowIndex: number | undefined
  let capturedColumnIndex: number | undefined

  RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => editorId,
    'Editor.cursorSet': (rowIndex: number, columnIndex: number) => {
      capturedRowIndex = rowIndex
      capturedColumnIndex = columnIndex
    },
    'Editor.handleFocus': () => {},
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

  expect(capturedRowIndex).toBe(1)
  expect(capturedColumnIndex).toBe(0)
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick with ::value handles column 0', async () => {
  const editorId = 789
  const lines = ['line 1']
  let capturedRowIndex: number | undefined
  let capturedColumnIndex: number | undefined

  RendererWorker.registerMockRpc({
    'GetActiveEditor.getActiveEditorId': () => editorId,
    'Editor.cursorSet': (rowIndex: number, columnIndex: number) => {
      capturedRowIndex = rowIndex
      capturedColumnIndex = columnIndex
    },
    'Editor.handleFocus': () => {},
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

  expect(capturedRowIndex).toBe(0)
  expect(capturedColumnIndex).toBe(0)
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick without :: parses row from item.label', async () => {
  let capturedRowIndex: number | undefined
  let capturedColumnIndex: number | undefined
  let handleFocusCalled = false

  RendererWorker.registerMockRpc({
    'Editor.cursorSet': (rowIndex: number, columnIndex: number) => {
      capturedRowIndex = rowIndex
      capturedColumnIndex = columnIndex
    },
    'Editor.handleFocus': () => {
      handleFocusCalled = true
    },
  })

  const item = { label: '5' }
  const value = '5'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(capturedRowIndex).toBe(5)
  expect(capturedColumnIndex).toBe(0)
  expect(handleFocusCalled).toBe(true)
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick without :: handles row 0', async () => {
  let capturedRowIndex: number | undefined
  let capturedColumnIndex: number | undefined

  RendererWorker.registerMockRpc({
    'Editor.cursorSet': (rowIndex: number, columnIndex: number) => {
      capturedRowIndex = rowIndex
      capturedColumnIndex = columnIndex
    },
    'Editor.handleFocus': () => {},
  })

  const item = { label: '0' }
  const value = '0'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(capturedRowIndex).toBe(0)
  expect(capturedColumnIndex).toBe(0)
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick without :: handles large row numbers', async () => {
  let capturedRowIndex: number | undefined
  let capturedColumnIndex: number | undefined

  RendererWorker.registerMockRpc({
    'Editor.cursorSet': (rowIndex: number, columnIndex: number) => {
      capturedRowIndex = rowIndex
      capturedColumnIndex = columnIndex
    },
    'Editor.handleFocus': () => {},
  })

  const item = { label: '100' }
  const value = '100'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(capturedRowIndex).toBe(100)
  expect(capturedColumnIndex).toBe(0)
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})
