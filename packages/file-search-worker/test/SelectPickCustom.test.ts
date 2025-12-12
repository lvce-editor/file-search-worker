import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import { state } from '../src/parts/QuickPickEntriesCustom/QuickPickEntriesCustomState.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { selectPick } from '../src/parts/SelectPickCustom/SelectPickCustom.ts'

test('selectPick calls QuickPick.executeCallback with resolveId and pick', async () => {
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

  state.args = ['arg1', 'arg2', 'resolve-id-123'] as any

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'test',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(invokedMethod).toBe('QuickPick.executeCallback')
  expect(invokedArgs).toEqual(['resolve-id-123', pick])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick handles different resolveIds', async () => {
  let invokedArgs: readonly unknown[] | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      invokedArgs = args
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  state.args = ['arg1', 'arg2', 'another-resolve-id'] as any

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'custom-item',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(invokedArgs).toEqual(['another-resolve-id', pick])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})
