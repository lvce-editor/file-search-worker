import { expect, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickAt from '../src/parts/HandleClickAt/HandleClickAt.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('handleClickAt calculates correct index from y coordinate', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Workspace.setPath') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({
    headerHeight: 38,
    itemHeight: 30,
    top: 50,
    items: [
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: 'item1',
        matches: [],
        uri: '/path/to/item1',
      },
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: 'item2',
        matches: [],
        uri: '/path/to/item2',
      },
    ],
    minLineY: 0,
    providerId: 0,
    value: '',
  })

  const y = 50 + 38 + 15
  const result = await HandleClickAt.handleClickAt(state, 100, y)

  expect(result).toBe(state)
})

test('handleClickAt returns state unchanged when index is out of bounds', async () => {
  const state = CreateDefaultState.createDefaultState({
    headerHeight: 38,
    itemHeight: 30,
    top: 50,
    items: [],
    minLineY: 0,
  })

  const y = 50 + 38 + 1000
  const result = await HandleClickAt.handleClickAt(state, 200, y)

  expect(result).toBe(state)
})

test('handleClickAt handles click at first item', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Workspace.setPath') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({
    headerHeight: 38,
    itemHeight: 30,
    top: 50,
    items: [
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: 'first',
        matches: [],
        uri: '/path/to/first',
      },
    ],
    minLineY: 0,
    providerId: 0,
    value: '',
  })

  const y = 50 + 38 + 15
  const result = await HandleClickAt.handleClickAt(state, 0, y)

  expect(result).toBe(state)
})

test('handleClickAt handles click at second item', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Workspace.setPath') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({
    headerHeight: 38,
    itemHeight: 30,
    top: 50,
    items: [
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: 'first',
        matches: [],
        uri: '/path/to/first',
      },
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: 'second',
        matches: [],
        uri: '/path/to/second',
      },
    ],
    minLineY: 0,
    providerId: 0,
    value: '',
  })

  const y = 50 + 38 + 30 + 15
  const result = await HandleClickAt.handleClickAt(state, 0, y)

  expect(result).toBe(state)
})

test('handleClickAt handles click above header', async () => {
  const state = CreateDefaultState.createDefaultState({
    headerHeight: 38,
    itemHeight: 30,
    top: 50,
    items: [
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: 'item',
        matches: [],
        uri: '/path/to/item',
      },
    ],
    minLineY: 0,
  })

  const y = 50 + 10
  const result = await HandleClickAt.handleClickAt(state, 0, y)

  expect(result).toBe(state)
})

test('handleClickAt ignores x coordinate', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Workspace.setPath') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const state = CreateDefaultState.createDefaultState({
    headerHeight: 38,
    itemHeight: 30,
    top: 50,
    items: [
      {
        description: '',
        direntType: 0,
        fileIcon: '',
        icon: '',
        label: 'item',
        matches: [],
        uri: '/path/to/item',
      },
    ],
    minLineY: 0,
    providerId: 0,
    value: '',
  })

  const y = 50 + 38 + 15
  const result1 = await HandleClickAt.handleClickAt(state, 0, y)
  const result2 = await HandleClickAt.handleClickAt(state, 1000, y)

  expect(result1).toBe(result2)
})

