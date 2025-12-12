import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetPicksCommand from '../src/parts/GetPicksCommand/GetPicksCommand.ts'
import * as MenuEntriesState from '../src/parts/MenuEntriesState/MenuEntriesState.ts'

test('getPicks returns builtin picks', async () => {
  const builtinPicks = [
    { id: 'command1', label: 'Command 1' },
    { id: 'command2', label: 'Command 2' },
  ]
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => builtinPicks,
  })

  const result = await GetPicksCommand.getPicks()

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    args: undefined,
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    id: 'command1',
    label: 'Command 1',
    matches: [],
    uri: '',
  })
  expect((result[1] as any).id).toBe('command2')
  expect(result[1].label).toBe('Command 2')
})

test('getPicks returns extension picks with ext prefix', async () => {
  const extensionPicks = [
    { id: 'ext.command1', label: 'Extension Command 1' },
    { args: ['arg1'], id: 'ext.command2', label: 'Extension Command 2' },
  ]
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => [],
    'ExtensionHost.getCommands': () => extensionPicks,
  })

  const result = await GetPicksCommand.getPicks()

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    args: undefined,
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    id: 'ext.ext.command1',
    label: 'Extension Command 1',
    matches: [],
    uri: '',
  })
  expect((result[1] as any).id).toBe('ext.ext.command2')
  expect((result[1] as any).args).toEqual(['arg1'])
})

test('getPicks combines builtin and extension picks', async () => {
  const builtinPicks = [{ id: 'builtin1', label: 'Builtin 1' }]
  const extensionPicks = [{ id: 'ext1', label: 'Extension 1' }]
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => builtinPicks,
    'ExtensionHost.getCommands': () => extensionPicks,
  })

  const result = await GetPicksCommand.getPicks()

  expect(result).toHaveLength(2)
  expect((result[0] as any).id).toBe('builtin1')
  expect((result[1] as any).id).toBe('ext.ext1')
})

test('getPicks handles missing label in extension picks', async () => {
  const extensionPicks = [{ id: 'command1' }]
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => [],
    'ExtensionHost.getCommands': () => extensionPicks,
  })

  const result = await GetPicksCommand.getPicks()

  expect(result).toHaveLength(1)
  expect(result[0].label).toBe('command1')
})

test('getPicks handles missing id in extension picks', async () => {
  const extensionPicks = [{ label: 'Command without id' }]
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => [],
    'ExtensionHost.getCommands': () => extensionPicks,
  })

  const result = await GetPicksCommand.getPicks()

  expect(result).toHaveLength(1)
  expect((result[0] as any).id).toBe('ext.undefined')
  expect(result[0].label).toBe('Command without id')
})

test('getPicks handles extension picks error', async () => {
  const builtinPicks = [{ id: 'builtin1', label: 'Builtin 1' }]
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => builtinPicks,
    'ExtensionHost.getCommands': () => {
      throw new Error('Extension host error')
    },
  })

  const result = await GetPicksCommand.getPicks()

  expect(result).toHaveLength(1)
  expect((result[0] as any).id).toBe('builtin1')
})

test('getPicks handles null extension picks', async () => {
  const builtinPicks = [{ id: 'builtin1', label: 'Builtin 1' }]
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => builtinPicks,
    'ExtensionHost.getCommands': () => null,
  })

  const result = await GetPicksCommand.getPicks()

  expect(result).toHaveLength(1)
  expect((result[0] as any).id).toBe('builtin1')
})

test('getPicks uses MenuEntriesState when Layout.getAllQuickPickMenuEntries fails', async () => {
  MenuEntriesState.clear()
  MenuEntriesState.add([{ id: 'state1', label: 'State 1' }])
  const mockRpc = RendererWorker.registerMockRpc({
    'Layout.getAllQuickPickMenuEntries': () => {
      throw new Error('Layout error')
    },
    'ExtensionHost.getCommands': () => [],
  })

  const result = await GetPicksCommand.getPicks()

  expect(result).toHaveLength(1)
  expect((result[0] as any).id).toBe('state1')
  expect(result[0].label).toBe('State 1')
})
