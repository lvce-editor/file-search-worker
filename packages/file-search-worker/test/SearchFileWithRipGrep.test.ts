import { expect, jest, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

const SearchFileWithRipGrep = await import('../src/parts/SearchFileWithRipGrep/SearchFileWithRipGrep.ts')

test('searches files without prepare', async () => {
  const mockInvoke = jest.fn<(method: string, ...params: unknown[]) => Promise<unknown>>()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  set(RpcId.RendererWorker, mockRpc)

  mockInvoke.mockResolvedValue('file1.txt\nfile2.txt\nfile3.txt')

  const result = await SearchFileWithRipGrep.searchFile('/test', 'query', false)
  expect(result).toEqual(['file1.txt', 'file2.txt', 'file3.txt'])
  expect(mockInvoke).toHaveBeenCalledWith('SearchProcess.invoke', 'SearchFile.searchFile', {
    limit: 9_999_999,
    ripGrepArgs: ['--files', '--sort-files'],
    searchPath: '/test',
  })
})

test.skip('searches files with prepare', async () => {
  const mockInvoke = jest.fn<(method: string, ...params: unknown[]) => Promise<unknown>>()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  set(RpcId.RendererWorker, mockRpc)

  mockInvoke.mockResolvedValue('file1.txt\nfile2.txt\nfile3.txt')

  const result = await SearchFileWithRipGrep.searchFile('/test', 'file2', true)
  expect(result).toEqual([
    {
      matches: expect.any(Array),
      pick: 'file2.txt',
    },
  ])
  expect(mockInvoke).toHaveBeenCalledWith('SearchProcess.invoke', 'SearchFile.searchFile', {
    limit: 9_999_999,
    ripGrepArgs: ['--files', '--sort-files'],
    searchPath: '/test',
  })
})

test('handles empty result', async () => {
  const mockInvoke = jest.fn<(method: string, ...params: unknown[]) => Promise<unknown>>()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  set(RpcId.RendererWorker, mockRpc)

  mockInvoke.mockResolvedValue('')

  const result = await SearchFileWithRipGrep.searchFile('/test', 'query', false)
  expect(result).toEqual([])
})

test('handles error from search process', async () => {
  const mockInvoke = jest.fn<(method: string, ...params: unknown[]) => Promise<unknown>>()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  set(RpcId.RendererWorker, mockRpc)

  mockInvoke.mockRejectedValue(new Error('Search failed'))

  await expect(SearchFileWithRipGrep.searchFile('/test', 'query', false)).rejects.toThrow('Search failed')
})
