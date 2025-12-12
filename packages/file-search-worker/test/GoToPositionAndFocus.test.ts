import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GoToPositionAndFocus from '../src/parts/GoToPositionAndFocus/GoToPositionAndFocus.ts'

test('goToPositionAndFocus calls Editor.cursorSet with correct row and column', async () => {
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

  await GoToPositionAndFocus.goToPositionAndFocus(5, 10)

  expect(capturedRowIndex).toBe(5)
  expect(capturedColumnIndex).toBe(10)
  expect(handleFocusCalled).toBe(true)
})

test('goToPositionAndFocus calls Editor.cursorSet before Editor.handleFocus', async () => {
  const callOrder: string[] = []
  RendererWorker.registerMockRpc({
    'Editor.cursorSet': () => {
      callOrder.push('cursorSet')
    },
    'Editor.handleFocus': () => {
      callOrder.push('handleFocus')
    },
  })

  await GoToPositionAndFocus.goToPositionAndFocus(0, 0)

  expect(callOrder).toEqual(['cursorSet', 'handleFocus'])
})

test('goToPositionAndFocus works with different row and column indices', async () => {
  let capturedRowIndex: number | undefined
  let capturedColumnIndex: number | undefined
  RendererWorker.registerMockRpc({
    'Editor.cursorSet': (rowIndex: number, columnIndex: number) => {
      capturedRowIndex = rowIndex
      capturedColumnIndex = columnIndex
    },
    'Editor.handleFocus': () => {},
  })

  await GoToPositionAndFocus.goToPositionAndFocus(42, 100)

  expect(capturedRowIndex).toBe(42)
  expect(capturedColumnIndex).toBe(100)
})

