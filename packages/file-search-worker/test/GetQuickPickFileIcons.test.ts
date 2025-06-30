import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { getQuickPickFileIcons } from '../src/parts/GetQuickPickFileIcons/GetQuickPickFileIcons.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set as setRpc } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('getQuickPickFileIcons returns icons and updates cache', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, { name }: { name: string }) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return `icon-for-${name}`
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const items = [
    { direntType: 1, label: 'file1.txt', uri: '/file1.txt', description: '', fileIcon: '', icon: '', matches: [] },
    { direntType: 1, label: 'file2.txt', uri: '/file2.txt', description: '', fileIcon: '', icon: '', matches: [] },
  ]
  const fileIconCache = { '/file1.txt': 'icon1' }
  const { icons, newFileIconCache } = await getQuickPickFileIcons(items, fileIconCache)
  expect(icons).toEqual(['icon1', 'icon-for-file2.txt'])
  expect(newFileIconCache).toEqual({ '/file1.txt': 'icon1', '/file2.txt': 'icon-for-file2.txt' })
})

test('getQuickPickFileIcons with all icons cached', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, { name }: { name: string }) => {
      if (method === 'IconTheme.getFileIcon' || method === 'IconTheme.getFolderIcon') {
        return `icon-for-${name}`
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RendererWorker, mockRpc)

  const items = [
    { direntType: 1, label: 'file1.txt', uri: '/file1.txt', description: '', fileIcon: '', icon: '', matches: [] },
    { direntType: 1, label: 'file2.txt', uri: '/file2.txt', description: '', fileIcon: '', icon: '', matches: [] },
  ]
  const fileIconCache = { '/file1.txt': 'icon1', '/file2.txt': 'icon2' }
  const { icons, newFileIconCache } = await getQuickPickFileIcons(items, fileIconCache)
  expect(icons).toEqual(['icon1', 'icon2'])
  expect(newFileIconCache).toEqual(fileIconCache)
})