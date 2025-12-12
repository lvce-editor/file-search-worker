import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as RequestFileIcons from '../src/parts/RequestFileIcons/RequestFileIcons.ts'

test('requests file icons', async () => {
  let callCount = 0
  const mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => {
      const icons = ['/icons/file.png', '/icons/other.png']
      return icons[callCount++]
    },
  })

  const requests = [
    { name: 'test.txt', path: '', type: DirentType.File },
    { name: 'other.txt', path: '', type: DirentType.File },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['/icons/file.png', '/icons/other.png'])
  expect(mockRpc.invocations).toEqual([
    ['IconTheme.getFileIcon', { name: 'test.txt' }],
    ['IconTheme.getFileIcon', { name: 'other.txt' }],
  ])
})

test('requests folder icons', async () => {
  let callCount = 0
  const mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFolderIcon': () => {
      const icons = ['/icons/folder.png', '/icons/folder2.png']
      return icons[callCount++]
    },
  })

  const requests = [
    { name: 'folder1', path: '', type: DirentType.Directory },
    { name: 'folder2', path: '', type: DirentType.Directory },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['/icons/folder.png', '/icons/folder2.png'])
  expect(mockRpc.invocations).toEqual([
    ['IconTheme.getFolderIcon', { name: 'folder1' }],
    ['IconTheme.getFolderIcon', { name: 'folder2' }],
  ])
})

test.skip('handles empty requests array', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => '',
    'IconTheme.getFolderIcon': () => '',
  })

  const result = await RequestFileIcons.requestFileIcons([])
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([])
})

test.skip('handles requests with no name', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'IconTheme.getFileIcon': () => '',
    'IconTheme.getFolderIcon': () => '',
  })

  const requests = [
    { name: '', path: '', type: DirentType.File },
    { name: '', path: '', type: DirentType.Directory },
  ]

  const result = await RequestFileIcons.requestFileIcons(requests)
  expect(result).toEqual(['', ''])
  expect(mockRpc.invocations).toEqual([])
})
