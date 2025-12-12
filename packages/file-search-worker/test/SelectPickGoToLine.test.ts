import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { RendererWorker as RendererWorkerId } from '../src/parts/RpcId/RpcId.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as SelectPickGoToLine from '../src/parts/SelectPickGoToLine/SelectPickGoToLine.ts'

test('selectPick with :: prefix goes to column position', async () => {
  let cursorSetRow: number | undefined
  let cursorSetColumn: number | undefined
  let handleFocusCalled = false

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly unknown[]): unknown => {
      switch (method) {
        case 'Editor.cursorSet': {
          cursorSetRow = args[0] as number
          cursorSetColumn = args[1] as number
          return undefined
        }
        case 'Editor.handleFocus': {
          handleFocusCalled = true
          return undefined
        }
        case 'GetActiveEditor.getActiveEditorId': {
          return 'editor-id-1'
        }
        default: {
          throw new Error(`unexpected method ${method}`)
        }
      }
    },
  })
  set(RendererWorkerId, mockRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, editorId: string) => {
      if (method === 'Editor.getLines2' && editorId === 'editor-id-1') {
        return ['line1', 'line2', 'line3']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  const item = { label: '5' }
  const value = '::10'
  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(result).toEqual({ command: QuickPickReturnValue.Hide })
  expect(cursorSetRow).toBe(1)
  expect(cursorSetColumn).toBe(4)
  expect(handleFocusCalled).toBe(true)
})

test('selectPick with :: prefix handles newlines correctly', async () => {
  let cursorSetRow: number | undefined
  let cursorSetColumn: number | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly unknown[]): unknown => {
      switch (method) {
        case 'Editor.cursorSet': {
          cursorSetRow = args[0] as number
          cursorSetColumn = args[1] as number
          return undefined
        }
        case 'Editor.handleFocus': {
          // no-op
          return undefined
        }
        case 'GetActiveEditor.getActiveEditorId': {
          return 'editor-id-2'
        }
        default: {
          throw new Error(`unexpected method ${method}`)
        }
      }
    },
  })
  set(RendererWorkerId, mockRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, editorId: string) => {
      if (method === 'Editor.getLines2' && editorId === 'editor-id-2') {
        return ['line1', 'line2', 'line3']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  const item = { label: '5' }
  const value = '::15'
  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(result).toEqual({ command: QuickPickReturnValue.Hide })
  expect(cursorSetRow).toBe(2)
  expect(cursorSetColumn).toBe(3)
})

test('selectPick without :: prefix goes to row from item.label', async () => {
  let cursorSetRow: number | undefined
  let cursorSetColumn: number | undefined
  let handleFocusCalled = false

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly unknown[]): unknown => {
      switch (method) {
        case 'Editor.cursorSet': {
          cursorSetRow = args[0] as number
          cursorSetColumn = args[1] as number
          return undefined
        }
        case 'Editor.handleFocus': {
          handleFocusCalled = true
          return undefined
        }
        case 'GetActiveEditor.getActiveEditorId': {
          return 'editor-id-3'
        }
        default: {
          throw new Error(`unexpected method ${method}`)
        }
      }
    },
  })
  set(RendererWorkerId, mockRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, editorId: string) => {
      if (method === 'Editor.getLines2' && editorId === 'editor-id-3') {
        return ['line1', 'line2', 'line3']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  const item = { label: '2' }
  const value = '2'
  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(result).toEqual({ command: QuickPickReturnValue.Hide })
  expect(cursorSetRow).toBe(2)
  expect(cursorSetColumn).toBe(0)
  expect(handleFocusCalled).toBe(true)
})

test('selectPick without :: prefix handles row 0', async () => {
  let cursorSetRow: number | undefined
  let cursorSetColumn: number | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly unknown[]): unknown => {
      switch (method) {
        case 'Editor.cursorSet': {
          cursorSetRow = args[0] as number
          cursorSetColumn = args[1] as number
          return undefined
        }
        case 'Editor.handleFocus': {
          // no-op
          return undefined
        }
        case 'GetActiveEditor.getActiveEditorId': {
          return 'editor-id-4'
        }
        default: {
          throw new Error(`unexpected method ${method}`)
        }
      }
    },
  })
  set(RendererWorkerId, mockRpc)

  const mockEditorRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, editorId: string) => {
      if (method === 'Editor.getLines2' && editorId === 'editor-id-4') {
        return ['line1', 'line2', 'line3']
      }
      throw new Error(`unexpected method ${method} with editorId ${editorId}`)
    },
  })
  EditorWorker.set(mockEditorRpc)

  const item = { label: '0' }
  const value = '0'
  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(result).toEqual({ command: QuickPickReturnValue.Hide })
  expect(cursorSetRow).toBe(0)
  expect(cursorSetColumn).toBe(0)
})
