import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { focusPick } from '../src/parts/FocusPick/FocusPick.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'

test('focusPick calls ColorTheme.setColorTheme for ColorTheme provider', async () => {
  let calledArgs: any

  const mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.setColorTheme': (args: any) => {
      calledArgs = args
    },
  })

  const pick = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'dark',
    matches: [],
    uri: '',
  }

  await focusPick(QuickPickEntryId.ColorTheme, pick)

  expect(calledArgs).toBe('dark')
  expect(mockRpc.invocations).toEqual([['ColorTheme.setColorTheme', 'dark']])
})

test('focusPick does nothing for non-ColorTheme provider', async () => {
  RendererWorker.registerMockRpc({})

  const pick = {
    description: '',
    direntType: 1,
    fileIcon: '',
    icon: '',
    label: 'file1.txt',
    matches: [],
    uri: '/file1.txt',
  }

  await focusPick(QuickPickEntryId.File, pick)
})
