import { expect, test, jest, beforeEach } from '@jest/globals'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'

const mockInvoke = jest.fn()

jest.unstable_mockModule('../src/parts/ParentRpc/ParentRpc.ts', () => ({
  invoke: mockInvoke,
}))

const RequestFileIcons = await import('../src/parts/RequestFileIcons/RequestFileIcons.ts')

beforeEach(() => {
  mockInvoke.mockReset()
})

test('requests file icons', async () => {
  // @ts-ignore
  mockInvoke.mockResolvedValueOnce('/icons/file.png').mockResolvedValueOnce('/icons/other.png')

  const requests = [
    { type: DirentType.File, name: 'test.txt', path: '' },
    { type: DirentType.File, name: 'other.txt', path: '' },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['/icons/file.png', '/icons/other.png'])
  expect(mockInvoke).toHaveBeenCalledTimes(2)
  expect(mockInvoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'test.txt' })
  expect(mockInvoke).toHaveBeenCalledWith('IconTheme.getFileIcon', { name: 'other.txt' })
})

test('requests folder icons', async () => {
  // @ts-ignore
  mockInvoke.mockResolvedValueOnce('/icons/folder.png').mockResolvedValueOnce('/icons/folder2.png')

  const requests = [
    { type: DirentType.Directory, name: 'folder1', path: '' },
    { type: DirentType.Directory, name: 'folder2', path: '' },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['/icons/folder.png', '/icons/folder2.png'])
  expect(mockInvoke).toHaveBeenCalledWith('IconTheme.getFolderIcon', { name: 'folder1' })
  expect(mockInvoke).toHaveBeenCalledWith('IconTheme.getFolderIcon', { name: 'folder2' })
})

test.skip('handles empty requests array', async () => {
  const result = await RequestFileIcons.requestFileIcons([])
  expect(result).toEqual([])
  expect(mockInvoke).not.toHaveBeenCalled()
})

test.skip('handles requests with no name', async () => {
  const requests = [
    { type: DirentType.File, name: '', path: '' },
    { type: DirentType.Directory, name: '', path: '' },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['', ''])
  expect(mockInvoke).not.toHaveBeenCalled()
})
