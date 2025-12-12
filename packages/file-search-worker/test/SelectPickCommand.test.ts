import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { selectPick } from '../src/parts/SelectPickCommand/SelectPickCommand.ts'

test('selectPickBuiltin calls RendererWorker.invoke with item id and args', async () => {
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
    args: ['arg1', 'arg2'],
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    id: 'AutoUpdater.checkForUpdates',
    label: 'test',
    matches: [],
    uri: '',
  } as any

  const result = await selectPick(pick)

  expect(invokedMethod).toBe('AutoUpdater.checkForUpdates')
  expect(invokedArgs).toEqual(['arg1', 'arg2'])
  expect(result.command).toBe(QuickPickReturnValue.KeepOpen)
})

test('selectPickBuiltin returns Hide when shouldHide returns true', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async () => {},
  })
  set(RpcId.RendererWorker, mockRpc)

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    id: 'test-command',
    label: 'test',
    matches: [],
    uri: '',
  } as any

  const result = await selectPick(pick)

  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPickBuiltin handles item without args', async () => {
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
    id: 'AutoUpdater.checkForUpdates',
    label: 'test',
    matches: [],
    uri: '',
  } as any

  const result = await selectPick(pick)

  expect(invokedArgs).toEqual([])
  expect(result.command).toBe(QuickPickReturnValue.KeepOpen)
})

test('selectPickExtension calls ExtensionHost.executeCommand with id without ext. prefix', async () => {
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
    id: 'ext.my-extension-command',
    label: 'test',
    matches: [],
    uri: '',
  } as any

  const result = await selectPick(pick)

  expect(invokedMethod).toBe('ExtensionHost.executeCommand')
  expect(invokedArgs).toEqual(['my-extension-command'])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPickExtension handles errors and shows error dialog', async () => {
  let showErrorDialogCalled = false
  let errorInfo: any

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      if (method === 'ExtensionHost.executeCommand') {
        throw new Error('Test error')
      }
      if (method === 'RendererWorker.showErrorDialog' || method === 'ErrorHandling.showErrorDialog') {
        showErrorDialogCalled = true
        errorInfo = args[0]
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    id: 'ext.failing-command',
    label: 'test',
    matches: [],
    uri: '',
  } as any

  const result = await selectPick(pick)

  expect(showErrorDialogCalled).toBe(true)
  expect(errorInfo).toBeDefined()
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})
