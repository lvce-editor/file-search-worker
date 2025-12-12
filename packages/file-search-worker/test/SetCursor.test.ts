import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import { set as setRpc } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as SetCursor from '../src/parts/SetCursor/SetCursor.ts'

test('setCursor calls Editor.cursorSet with correct row and column', async () => {
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
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  await SetCursor.setCursor(5, 10)

  expect(capturedRowIndex).toBe(5)
  expect(capturedColumnIndex).toBe(10)
})

test('setCursor works with zero indices', async () => {
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
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  await SetCursor.setCursor(0, 0)

  expect(capturedRowIndex).toBe(0)
  expect(capturedColumnIndex).toBe(0)
})

test('setCursor works with different row and column indices', async () => {
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
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  await SetCursor.setCursor(42, 100)

  expect(capturedRowIndex).toBe(42)
  expect(capturedColumnIndex).toBe(100)
})

test('setCursor handles large indices', async () => {
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
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

  await SetCursor.setCursor(1000, 5000)

  expect(capturedRowIndex).toBe(1000)
  expect(capturedColumnIndex).toBe(5000)
})
