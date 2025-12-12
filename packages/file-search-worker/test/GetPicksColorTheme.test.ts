import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as GetPicksColorTheme from '../src/parts/GetPicksColorTheme/GetPicksColorTheme.ts'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('getPicks returns color theme names as picks', async () => {
  const colorThemeNames = ['dark-plus', 'light-plus', 'monokai']
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return colorThemeNames
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RendererWorker, mockRpc)

  const result = await GetPicksColorTheme.getPicks('')

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: 'dark-plus',
    matches: [],
    uri: '',
  })
  expect(result[1].label).toBe('light-plus')
  expect(result[2].label).toBe('monokai')
})

test('getPicks returns empty array when no color themes', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ColorTheme.getColorThemeNames') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RendererWorker, mockRpc)

  const result = await GetPicksColorTheme.getPicks('search')

  expect(result).toEqual([])
})
