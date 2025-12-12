import { expect, jest, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as RequestFileIcons from '../src/parts/RequestFileIcons/RequestFileIcons.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('requests file icons', async () => {
  const mockInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  set(RpcId.RendererWorker, mockRpc)

  mockInvoke.mockResolvedValueOnce('/icons/file.png').mockResolvedValueOnce('/icons/other.png')

  const requests = [
    { name: 'test.txt', path: '', type: DirentType.File },
    { name: 'other.txt', path: '', type: DirentType.File },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['/icons/file.png', '/icons/other.png'])
  expect(mockInvoke).toHaveBeenCalledTimes(2)
  expect(mockInvoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'test.txt' })
  expect(mockInvoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'other.txt' })
})

test('requests folder icons', async () => {
  const mockInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  set(RpcId.RendererWorker, mockRpc)

  mockInvoke.mockResolvedValueOnce('/icons/folder.png').mockResolvedValueOnce('/icons/folder2.png')

  const requests = [
    { name: 'folder1', path: '', type: DirentType.Directory },
    { name: 'folder2', path: '', type: DirentType.Directory },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['/icons/folder.png', '/icons/folder2.png'])
  expect(mockInvoke).toHaveBeenCalledWith('IconTheme.getFolderIcon', { name: 'folder1' })
  expect(mockInvoke).toHaveBeenCalledWith('IconTheme.getFolderIcon', { name: 'folder2' })
})

test.skip('handles empty requests array', async () => {
  const mockInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  set(RpcId.RendererWorker, mockRpc)

  const result = await RequestFileIcons.requestFileIcons([])
  expect(result).toEqual([])
  expect(mockInvoke).not.toHaveBeenCalled()
})

test.skip('handles requests with no name', async () => {
  const mockInvoke = jest.fn<(method: string, ...params: any[]) => Promise<any>>()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  set(RpcId.RendererWorker, mockRpc)

  const requests = [
    { name: '', path: '', type: DirentType.File },
    { name: '', path: '', type: DirentType.Directory },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['', ''])
  expect(mockInvoke).not.toHaveBeenCalled()
})
