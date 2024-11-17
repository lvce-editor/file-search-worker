import { expect, test, jest, beforeEach } from '@jest/globals'
import * as GetText from '../src/parts/GetText/GetText.ts'

const mockFetch = jest.fn()

// @ts-ignore
globalThis.fetch = mockFetch

beforeEach(() => {
  mockFetch.mockClear()
})

test('gets text successfully', async () => {
  // @ts-ignore
  mockFetch.mockResolvedValue({
    ok: true,
    text: () => Promise.resolve('sample text'),
  })

  const result = await GetText.getText('http://example.com/file.txt')
  expect(result).toBe('sample text')
})

test('handles fetch error', async () => {
  // @ts-ignore
  mockFetch.mockRejectedValue(new Error('Network error'))

  await expect(GetText.getText('http://example.com/file.txt')).rejects.toThrow(
    'Failed to request text for http://example.com/file.txt: Network error',
  )
})

test('handles non-ok response', async () => {
  // @ts-ignore
  mockFetch.mockResolvedValue({
    ok: false,
    statusText: 'Not Found',
  })

  await expect(GetText.getText('http://example.com/file.txt')).rejects.toThrow('Failed to request text for http://example.com/file.txt: Not Found')
})

test('handles text parsing error', async () => {
  // @ts-ignore
  mockFetch.mockResolvedValue({
    ok: true,
    text: () => Promise.reject(new Error('Text parsing failed')),
  })

  await expect(GetText.getText('http://example.com/file.txt')).rejects.toThrow(
    'Failed to request text for http://example.com/file.txt: Text parsing failed',
  )
})
