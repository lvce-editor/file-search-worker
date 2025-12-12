import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as Close from '../src/parts/Close/Close.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('close calls closeWidget with correct uid', async () => {
  let invokedMethod: string | undefined
  let invokedArgs: readonly unknown[] | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      invokedMethod = method
      invokedArgs = args
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    uid: 123,
  }

  const result = await Close.close(state)

  expect(invokedMethod).toBe('Viewlet.closeWidget')
  expect(invokedArgs).toEqual([123])
  expect(result).toBe(state)
})

test('close returns the same state object', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async () => {
      // no-op
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    uid: 456,
  }

  const result = await Close.close(state)

  expect(result).toBe(state)
})
