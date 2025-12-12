import { expect, test } from '@jest/globals'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as SelectPickRecent from '../src/parts/SelectPickRecent/SelectPickRecent.ts'

test('selectPick calls Workspace.setPath with the pick uri', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setPath': () => {},
  })

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

  expect((mockRpc as any).invocations).toEqual([
    {
      method: 'Workspace.setPath',
      args: ['/path/to/workspace'],
    },
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick returns Hide command after opening workspace folder', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setPath': () => {},
  })

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

  expect((mockRpc as any).invocations).toEqual([
    {
      method: 'Workspace.setPath',
      args: ['/another/path'],
    },
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})

test('selectPick handles different uri formats', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Workspace.setPath': () => {},
  })

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

  expect((mockRpc as any).invocations).toEqual([
    {
      method: 'Workspace.setPath',
      args: ['file:///home/user/project'],
    },
  ])
  expect(result.command).toBe(QuickPickReturnValue.Hide)
})
