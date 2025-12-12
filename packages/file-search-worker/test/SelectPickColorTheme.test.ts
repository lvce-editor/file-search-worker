import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { selectPick } from '../src/parts/SelectPickColorTheme/SelectPickColorTheme.ts'

test('selectPick calls setColorTheme with pick label and returns Hide command', async () => {
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

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'dark-plus',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(invokedMethod).toBe('ColorTheme.setColorTheme')
  expect(invokedArgs).toEqual(['dark-plus'])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick handles different color theme labels', async () => {
  let invokedArgs: readonly unknown[] | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      invokedArgs = args
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'light-plus',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(invokedArgs).toEqual(['light-plus'])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

