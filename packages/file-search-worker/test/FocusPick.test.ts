import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import { focusPick } from '../src/parts/FocusPick/FocusPick.ts'
import * as QuickPickEntryId from '../src/parts/QuickPickEntryId/QuickPickEntryId.ts'
import { set as setRpc } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('focusPick calls ColorTheme.setColorTheme for ColorTheme provider', async () => {
  let calledMethod: string | undefined
  let calledArgs: any

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, args: any) => {
      calledMethod = method
      calledArgs = args
      return undefined
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

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

  expect(calledMethod).toBe('ColorTheme.setColorTheme')
  expect(calledArgs).toBe('dark')
})

test('focusPick does nothing for non-ColorTheme provider', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  setRpc(RpcId.RendererWorker, mockRpc)

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
