import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as GetPicksFile from '../src/parts/GetPicksFile/GetPicksFile.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as SearchFileModule from '../src/parts/SearchFileModule/SearchFileModule.ts'

const mockSearchHandler = async (path: string, value: string, prepare: boolean, assetDir: string): Promise<readonly string[]> => {
  return ['/workspace/file1.txt', '/workspace/file2.ts', '/workspace/subdir/file3.js']
}

test('getPicks returns file picks from search', async () => {
  SearchFileModule.register({ '': mockSearchHandler })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Workspace.getPath') {
        return '/workspace'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const result = await GetPicksFile.getPicks('file')

  expect(result).toEqual([
    {
      description: '/workspace',
      direntType: DirentType.File,
      fileIcon: '',
      icon: '',
      label: 'file1.txt',
      matches: [],
      uri: '/workspace/file1.txt',
    },
    {
      description: '/workspace',
      direntType: DirentType.File,
      fileIcon: '',
      icon: '',
      label: 'file2.ts',
      matches: [],
      uri: '/workspace/file2.ts',
    },
    {
      description: '/workspace/subdir',
      direntType: DirentType.File,
      fileIcon: '',
      icon: '',
      label: 'file3.js',
      matches: [],
      uri: '/workspace/subdir/file3.js',
    },
  ])
})

test('getPicks returns empty array when no workspace', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Workspace.getPath') {
        return null
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const result = await GetPicksFile.getPicks('file')

  expect(result).toEqual([])
})

test('getPicks returns empty array when workspace is empty string', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Workspace.getPath') {
        return ''
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const result = await GetPicksFile.getPicks('file')

  expect(result).toEqual([])
})

const mockSearchHandlerRoot = async (path: string, value: string, prepare: boolean, assetDir: string): Promise<readonly string[]> => {
  return ['/workspace/root.txt']
}

test('getPicks handles files in root directory', async () => {
  SearchFileModule.register({ '': mockSearchHandlerRoot })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Workspace.getPath') {
        return '/workspace'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const result = await GetPicksFile.getPicks('root')

  expect(result).toHaveLength(1)
  expect(result[0].label).toBe('root.txt')
  expect(result[0].description).toBe('/workspace')
})

const mockSearchHandlerEmpty = async (path: string, value: string, prepare: boolean, assetDir: string): Promise<readonly string[]> => {
  return []
}

test('getPicks handles empty search results', async () => {
  SearchFileModule.register({ '': mockSearchHandlerEmpty })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Workspace.getPath') {
        return '/workspace'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const result = await GetPicksFile.getPicks('nonexistent')

  expect(result).toEqual([])
})
