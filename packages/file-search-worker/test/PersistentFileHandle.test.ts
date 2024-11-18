import { expect, test, jest, beforeEach } from '@jest/globals'

const mockGetHandle = jest.fn()

jest.unstable_mockModule('../src/parts/IndexedDb/IndexedDb.ts', () => ({
  getHandle: mockGetHandle,
}))

const PersistentFileHandle = await import('../src/parts/PersistentFileHandle/PersistentFileHandle.ts')

beforeEach(() => {
  mockGetHandle.mockClear()
})

test('gets handle successfully', async () => {
  const mockHandle = { type: 'file', name: 'test.txt' }
  // @ts-ignore
  mockGetHandle.mockResolvedValue(mockHandle)

  const result = await PersistentFileHandle.getHandle('/test/file.txt')
  expect(result).toBe(mockHandle)
})

test('handles error when getting handle', async () => {
  const error = new Error('Database error')
  // @ts-ignore
  mockGetHandle.mockRejectedValue(error)

  await expect(PersistentFileHandle.getHandle('/test/file.txt')).rejects.toThrow('Failed to get handle: Database error')
})

test('handles undefined handle', async () => {
  // @ts-ignore
  mockGetHandle.mockResolvedValue(undefined)

  const result = await PersistentFileHandle.getHandle('/test/file.txt')
  expect(result).toBeUndefined()
})
