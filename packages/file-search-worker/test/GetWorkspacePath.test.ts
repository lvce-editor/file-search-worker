import { test, expect } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import { getWorkspacePath } from '../src/parts/GetWorkspacePath/GetWorkspacePath.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('getWorkspacePath should invoke Workspace.getPath and return the path', async () => {
  const mockWorkspacePath = '/test/workspace'

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'Workspace.getPath') {
        return mockWorkspacePath
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const result = await getWorkspacePath()
  expect(result).toBe(mockWorkspacePath)
})

test('getWorkspacePath should handle different workspace paths', async () => {
  const mockWorkspacePath = '/another/workspace/path'

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'Workspace.getPath') {
        return mockWorkspacePath
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const result = await getWorkspacePath()
  expect(result).toBe(mockWorkspacePath)
})
