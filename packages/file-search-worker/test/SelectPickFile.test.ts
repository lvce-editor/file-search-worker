import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { selectPick } from '../src/parts/SelectPickFile/SelectPickFile.ts'

test('selectPick constructs absolute path and opens uri', async () => {
  let openedUri: string | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      if (method === 'Workspace.getPath') {
        return '/workspace/path'
      }
      if (method === 'Main.openUri') {
        openedUri = args[0] as string
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RendererWorker, mockRpc)

  const pick: ProtoVisibleItem = {
    description: 'src/components',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'Button.tsx',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(openedUri).toBe('/workspace/path/src/components/Button.tsx')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick handles different file paths', async () => {
  let openedUri: string | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      if (method === 'Workspace.getPath') {
        return '/home/user/project'
      }
      if (method === 'Main.openUri') {
        openedUri = args[0] as string
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RendererWorker, mockRpc)

  const pick: ProtoVisibleItem = {
    description: 'packages/utils',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'helper.ts',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(openedUri).toBe('/home/user/project/packages/utils/helper.ts')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick handles empty description', async () => {
  let openedUri: string | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      if (method === 'Workspace.getPath') {
        return '/workspace'
      }
      if (method === 'Main.openUri') {
        openedUri = args[0] as string
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RendererWorker, mockRpc)

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'root-file.ts',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(openedUri).toBe('/workspace//root-file.ts')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})
