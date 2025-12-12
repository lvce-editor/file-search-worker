import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set as setRpc } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as SelectPickRecent from '../src/parts/SelectPickRecent/SelectPickRecent.ts'

test('selectPick calls Workspace.setPath with the pick uri', async () => {
  let capturedUri: string | undefined
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: any[]) => {
      if (method === 'Workspace.setPath') {
        capturedUri = args[0]
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const pick = {
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'test-folder',
    matches: [],
    uri: '/path/to/workspace',
  }

  const result = await SelectPickRecent.selectPick(pick)

  expect(capturedUri).toBe('/path/to/workspace')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick returns Hide command after opening workspace folder', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Workspace.setPath') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const pick = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'another-folder',
    matches: [],
    uri: '/another/path',
  }

  const result = await SelectPickRecent.selectPick(pick)

  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick handles different uri formats', async () => {
  let capturedUri: string | undefined
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: any[]) => {
      if (method === 'Workspace.setPath') {
        capturedUri = args[0]
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const pick = {
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'workspace',
    matches: [],
    uri: 'file:///home/user/project',
  }

  const result = await SelectPickRecent.selectPick(pick)

  expect(capturedUri).toBe('file:///home/user/project')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

