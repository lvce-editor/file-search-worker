import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '../src/parts/RpcId/RpcId.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'
import { setColorTheme } from '../src/parts/SetColorTheme/SetColorTheme.js'

test('setColorTheme should invoke ColorTheme.setColorTheme with the provided id', async () => {
  let invokedMethod: string | undefined
  let invokedArgs: readonly unknown[] | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly unknown[]) => {
      invokedMethod = method
      invokedArgs = args
      return Promise.resolve()
    },
  })
  set(RendererWorker, mockRpc)

  const colorThemeId = 'dark-plus'
  await setColorTheme(colorThemeId)

  expect(invokedMethod).toBe('ColorTheme.setColorTheme')
  expect(invokedArgs).toEqual([colorThemeId])
})
