import { expect, test, jest, beforeEach } from '@jest/globals'

const mockInvoke = jest.fn()

jest.unstable_mockModule('../src/parts/SearchProcess/SearchProcess.ts', () => ({
  invoke: mockInvoke,
}))

const SearchFileWithRipGrep = await import('../src/parts/SearchFileWithRipGrep/SearchFileWithRipGrep.ts')

beforeEach(() => {
  mockInvoke.mockClear()
})

test('searches files without prepare', async () => {
  // @ts-ignore
  mockInvoke.mockResolvedValue('file1.txt\nfile2.txt\nfile3.txt')

  const result = await SearchFileWithRipGrep.searchFile('/test', 'query', false)
  expect(result).toEqual(['file1.txt', 'file2.txt', 'file3.txt'])
  expect(mockInvoke).toHaveBeenCalledWith('SearchFile.searchFile', {
    ripGrepArgs: ['--files', '--sort-files'],
    searchPath: '/test',
    limit: 9_999_999,
  })
})

test('searches files with prepare', async () => {
  // @ts-ignore
  mockInvoke.mockResolvedValue('file1.txt\nfile2.txt\nfile3.txt')

  const result = await SearchFileWithRipGrep.searchFile('/test', 'file2', true)
  expect(result).toEqual([
    {
      pick: 'file2.txt',
      matches: expect.any(Array),
    },
  ])
  expect(mockInvoke).toHaveBeenCalledWith('SearchFile.searchFile', {
    ripGrepArgs: ['--files', '--sort-files'],
    searchPath: '/test',
    limit: 9_999_999,
  })
})

test('handles empty result', async () => {
  // @ts-ignore
  mockInvoke.mockResolvedValue('')

  const result = await SearchFileWithRipGrep.searchFile('/test', 'query', false)
  expect(result).toEqual([])
})

test('handles error from search process', async () => {
  // @ts-ignore
  mockInvoke.mockRejectedValue(new Error('Search failed'))

  await expect(SearchFileWithRipGrep.searchFile('/test', 'query', false)).rejects.toThrow('Search failed')
})
