import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import * as SelectPickGoToLine from '../src/parts/SelectPickGoToLine/SelectPickGoToLine.ts'

test('selectPick without :: parses row from item.label', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {},
    'Editor.handleFocus': () => {},
  })

  const item = { label: '5' }
  const value = '5'

  const result = await SelectPickGoToLine.selectPick(item, value)

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 5, 0], ['Editor.handleFocus']])
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

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 0, 0], ['Editor.handleFocus']])
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

  expect(mockRpc.invocations).toEqual([['Editor.cursorSet', 100, 0], ['Editor.handleFocus']])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})
