import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ProtoVisibleItem } from '../src/parts/ProtoVisibleItem/ProtoVisibleItem.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import { selectPick } from '../src/parts/SelectPickFile/SelectPickFile.ts'

test('selectPick constructs absolute path and opens uri', async () => {
  let openedUri: string | undefined

  const mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getPath': () => '/workspace/path',
    'Main.openUri': (uri: string) => {
      openedUri = uri
    },
  })

  const pick: ProtoVisibleItem = {
    description: 'src/components',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'Button.tsx',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(openedUri).toBe('/workspace/path/src/components/Button.tsx')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
  expect(mockRpc.invocations).toEqual([
    ['Workspace.getPath'],
    ['Main.openUri', '/workspace/path/src/components/Button.tsx'],
  ])
})

test('selectPick handles different file paths', async () => {
  let openedUri: string | undefined

  const mockRpc = RendererWorker.registerMockRpc({
    'Workspace.getPath': () => '/home/user/project',
    'Main.openUri': (uri: string) => {
      openedUri = uri
    },
  })

  const pick: ProtoVisibleItem = {
    description: 'packages/utils',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'helper.ts',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(openedUri).toBe('/home/user/project/packages/utils/helper.ts')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
  expect(mockRpc.invocations).toEqual([
    ['Workspace.getPath'],
    ['Main.openUri', '/home/user/project/packages/utils/helper.ts'],
  ])
})

test('selectPick handles empty description', async () => {
  let openedUri: string | undefined

  RendererWorker.registerMockRpc({
    'Workspace.getPath': () => '/workspace',
    'Main.openUri': (uri: string) => {
      openedUri = uri
    },
  })

  const pick: ProtoVisibleItem = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'root-file.ts',
    matches: [],
    uri: '',
  }

  const result = await selectPick(pick)

  expect(openedUri).toBe('/workspace//root-file.ts')
  expect(result.command).toBe(QuickPickReturnValue.Hide)
  expect(mockRpc.invocations).toEqual([
    ['Workspace.getPath'],
    ['Main.openUri', '/workspace//root-file.ts'],
  ])
})
