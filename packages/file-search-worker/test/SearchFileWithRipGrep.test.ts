import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SearchFileWithRipGrep from '../src/parts/SearchFileWithRipGrep/SearchFileWithRipGrep.ts'

test('searches files without prepare', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => 'file1.txt\nfile2.txt\nfile3.txt',
  })

  const result = await SearchFileWithRipGrep.searchFile('/test', 'query', false)
  expect(result).toEqual(['file1.txt', 'file2.txt', 'file3.txt'])
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'SearchFile.searchFile',
      {
        limit: 9_999_999,
        ripGrepArgs: ['--files', '--sort-files', '--hidden', '--glob', '!.git', '--glob', '!elm-stuff'],
        searchPath: '/test',
      },
    ],
  ])
})

test('searches files with prepare', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => 'file1.txt\nfile2.txt\nfile3.txt',
  })

  const result = await SearchFileWithRipGrep.searchFile('/test', 'file2', true)
  expect(result).toEqual(['file1.txt', 'file2.txt', 'file3.txt'])
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'SearchFile.searchFile',
      {
        limit: 9_999_999,
        ripGrepArgs: ['--files', '--sort-files', '--hidden', '--glob', '!.git', '--glob', '!elm-stuff'],
        searchPath: '/test',
      },
    ],
  ])
})

test('handles empty result', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => '',
  })

  const result = await SearchFileWithRipGrep.searchFile('/test', 'query', false)
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'SearchFile.searchFile',
      {
        limit: 9_999_999,
        ripGrepArgs: ['--files', '--sort-files', '--hidden', '--glob', '!.git', '--glob', '!elm-stuff'],
        searchPath: '/test',
      },
    ],
  ])
})

test('handles error from search process', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => {
      throw new Error('Search failed')
    },
  })

  await expect(SearchFileWithRipGrep.searchFile('/test', 'query', false)).rejects.toThrow('Search failed')
  expect(mockRpc.invocations).toEqual([
    [
      'SearchProcess.invoke',
      'SearchFile.searchFile',
      {
        limit: 9_999_999,
        ripGrepArgs: ['--files', '--sort-files', '--hidden', '--glob', '!.git', '--glob', '!elm-stuff'],
        searchPath: '/test',
      },
    ],
  ])
})

test('returns a cache hit without parsing or returning file paths', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => ({ hash: 'a'.repeat(64), matchesCache: true, results: '' }),
  })

  await expect(SearchFileWithRipGrep.searchFile('/test', 'query', false, '', 'a'.repeat(64))).resolves.toEqual({
    hash: 'a'.repeat(64),
    matchesCache: true,
    results: [],
  })
  expect(mockRpc.invocations[0][2]).toMatchObject({ ifNonMatch: 'a'.repeat(64), limit: 9_999_999 })
})

test('parses changed results and returns their cache hash', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => ({ hash: 'b'.repeat(64), matchesCache: false, results: 'file1.txt\nfile2.txt' }),
  })

  await expect(SearchFileWithRipGrep.searchFile('/test', 'query', false, '', 'a'.repeat(64))).resolves.toEqual({
    hash: 'b'.repeat(64),
    matchesCache: false,
    results: ['file1.txt', 'file2.txt'],
  })
  expect(mockRpc.invocations).toHaveLength(1)
})
