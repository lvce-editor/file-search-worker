import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetPosition from '../src/parts/GetPosition/GetPosition.ts'
import * as GetText from '../src/parts/GetText/GetText.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { selectPick } from '../src/parts/SelectPickGoToLine/SelectPickGoToLine.ts'
import * as SetCursor from '../src/parts/SetCursor/SetCursor.ts'

test('selectPick goes to line when value does not start with ::', async () => {
  let setCursorCalled = false
  let setCursorRow: number | undefined
  let setCursorColumn: number | undefined
  let handleFocusCalled = false

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      if (method === 'Editor.handleFocus') {
        handleFocusCalled = true
      }
      if (method === 'Editor.setCursor') {
        setCursorCalled = true
        setCursorRow = args[0] as number
        setCursorColumn = args[1] as number
      }
    },
  })
  set(RendererWorker, mockRpc)

  const item = {
    label: '42',
  }

  const result = await selectPick(item, '42')

  expect(setCursorCalled).toBe(true)
  expect(setCursorRow).toBe(42)
  expect(setCursorColumn).toBe(0)
  expect(handleFocusCalled).toBe(true)
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick goes to column when value starts with ::', async () => {
  let setCursorCalled = false
  let setCursorRow: number | undefined
  let setCursorColumn: number | undefined
  let handleFocusCalled = false

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      if (method === 'Editor.handleFocus') {
        handleFocusCalled = true
      }
    },
  })
  set(RendererWorker, mockRpc)

  const originalGetText = GetText.getText
  GetText.getText = async () => {
    return 'line1\nline2\nline3'
  }

  const originalGetPosition = GetPosition.getPosition
  GetPosition.getPosition = (text: string, column: number) => {
    return { column: column, row: 1 }
  }

  const originalSetCursor = SetCursor.setCursor
  SetCursor.setCursor = async (row: number, column: number) => {
    setCursorCalled = true
    setCursorRow = row
    setCursorColumn = column
  }

  const item = {
    label: '0',
  }

  const result = await selectPick(item, '::10')

  expect(setCursorCalled).toBe(true)
  expect(setCursorRow).toBe(1)
  expect(setCursorColumn).toBe(10)
  expect(handleFocusCalled).toBe(true)
  expect(result.command).toBe(QuickPickReturnValue.Hide)

  GetText.getText = originalGetText
  GetPosition.getPosition = originalGetPosition
  SetCursor.setCursor = originalSetCursor
})

test('selectPick handles different column values', async () => {
  let setCursorColumn: number | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async () => {},
  })
  set(RendererWorker, mockRpc)

  const originalGetText = GetText.getText
  GetText.getText = async () => {
    return 'test text'
  }

  const originalGetPosition = GetPosition.getPosition
  GetPosition.getPosition = (text: string, column: number) => {
    return { column: column, row: 0 }
  }

  const originalSetCursor = SetCursor.setCursor
  SetCursor.setCursor = async (row: number, column: number) => {
    setCursorColumn = column
  }

  const item = {
    label: '0',
  }

  const result = await selectPick(item, '::25')

  expect(setCursorColumn).toBe(25)
  expect(result.command).toBe(QuickPickReturnValue.Hide)

  GetText.getText = originalGetText
  GetPosition.getPosition = originalGetPosition
  SetCursor.setCursor = originalSetCursor
})
