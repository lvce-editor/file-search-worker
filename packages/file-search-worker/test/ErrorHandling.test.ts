import { test, expect, jest } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import * as ErrorHandling from '../src/parts/ErrorHandling/ErrorHandling.ts'
import { set } from '../src/parts/RpcRegistry/RpcRegistry.ts'

class TestError extends Error {
  code: string
  constructor(message: string, code: string) {
    super(message)
    this.name = 'TestError'
    this.code = code
  }
}

test('handleError logs error to console', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const error = new Error('test error')

  await ErrorHandling.handleError(error)

  expect(consoleErrorSpy).toHaveBeenCalledWith(error)
  consoleErrorSpy.mockRestore()
})

test('handleError logs error with prefix', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  const error = new Error('test error')
  const prefix = 'prefix: '

  await ErrorHandling.handleError(error, true, prefix)

  expect(consoleErrorSpy).toHaveBeenCalledWith(error)
  consoleErrorSpy.mockRestore()
})

test('showErrorDialog extracts error properties and calls RendererWorker.showErrorDialog', async () => {
  let invokedMethod: string | undefined
  let invokedArgs: readonly unknown[] | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      invokedMethod = method
      invokedArgs = args
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const error = new TestError('test error', 'TEST_CODE')
  error.stack = 'Error: test error\n    at test.js:1:1'

  await ErrorHandling.showErrorDialog(error)

  expect(invokedMethod).toBe('ErrorHandling.showErrorDialog')
  expect(invokedArgs).toEqual([
    {
      code: 'TEST_CODE',
      message: 'test error',
      name: 'TestError',
      stack: 'Error: test error\n    at test.js:1:1',
    },
  ])
})

test('showErrorDialog handles error without all properties', async () => {
  let invokedMethod: string | undefined
  let invokedArgs: readonly unknown[] | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string, ...args: readonly unknown[]) => {
      invokedMethod = method
      invokedArgs = args
    },
  })
  set(RpcId.RendererWorker, mockRpc)

  const error: any = { message: 'simple error' }

  await ErrorHandling.showErrorDialog(error)

  expect(invokedMethod).toBe('ErrorHandling.showErrorDialog')
  expect(invokedArgs).toEqual([
    {
      code: undefined,
      message: 'simple error',
      name: undefined,
      stack: undefined,
    },
  ])
})

test('warn logs warning to console', () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

  ErrorHandling.warn('warning message', 123, { key: 'value' })

  expect(consoleWarnSpy).toHaveBeenCalledWith('warning message', 123, { key: 'value' })
  consoleWarnSpy.mockRestore()
})
