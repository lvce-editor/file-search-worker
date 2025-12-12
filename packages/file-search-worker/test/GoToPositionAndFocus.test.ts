import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import * as GoToPositionAndFocus from '../src/parts/GoToPositionAndFocus/GoToPositionAndFocus.ts'
import { set as setRpc } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('goToPositionAndFocus calls Editor.cursorSet with correct row and column', async () => {
  let capturedRowIndex: number | undefined
  let capturedColumnIndex: number | undefined
  let handleFocusCalled = false
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: unknown[]) => {
      if (method === 'Editor.cursorSet') {
        capturedRowIndex = args[0] as number
        capturedColumnIndex = args[1] as number
        return
      }
      if (method === 'Editor.handleFocus') {
        handleFocusCalled = true
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  await GoToPositionAndFocus.goToPositionAndFocus(5, 10)

  expect(capturedRowIndex).toBe(5)
  expect(capturedColumnIndex).toBe(10)
  expect(handleFocusCalled).toBe(true)
})

test('goToPositionAndFocus calls Editor.cursorSet before Editor.handleFocus', async () => {
  const callOrder: string[] = []
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Editor.cursorSet') {
        callOrder.push('cursorSet')
        return
      }
      if (method === 'Editor.handleFocus') {
        callOrder.push('handleFocus')
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  await GoToPositionAndFocus.goToPositionAndFocus(0, 0)

  expect(callOrder).toEqual(['cursorSet', 'handleFocus'])
})

test('goToPositionAndFocus works with different row and column indices', async () => {
  let capturedRowIndex: number | undefined
  let capturedColumnIndex: number | undefined
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: unknown[]) => {
      if (method === 'Editor.cursorSet') {
        capturedRowIndex = args[0] as number
        capturedColumnIndex = args[1] as number
        return
      }
      if (method === 'Editor.handleFocus') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  await GoToPositionAndFocus.goToPositionAndFocus(42, 100)

  expect(capturedRowIndex).toBe(42)
  expect(capturedColumnIndex).toBe(100)
})

