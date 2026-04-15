import { beforeEach, expect, test } from '@jest/globals'
import * as SearchFile from '../src/parts/SearchFile/SearchFile.ts'
import * as SearchFileModule from '../src/parts/SearchFileModule/SearchFileModule.ts'

beforeEach(() => {
  SearchFileModule.clear()
})

test('searchFile uses the registered handler for file paths', async () => {
  const expected = ['/test/file-1.ts', '/test/file-2.ts']
  SearchFileModule.register({
    '': async (path, value, prepare, assetDir) => {
      expect(path).toBe('/test')
      expect(value).toBe('file')
      expect(prepare).toBe(false)
      expect(assetDir).toBe('/assets')
      return expected
    },
  })

  const items = await SearchFile.searchFile('/test', 'file', false, '/assets')

  expect(items).toEqual(expected)
})

test('searchFile uses the registered handler for protocol paths', async () => {
  const expected = ['memfs:///test/file-1.ts']
  SearchFileModule.register({
    memfs: async (path, value, prepare, assetDir) => {
      expect(path).toBe('memfs:///test')
      expect(value).toBe('file')
      expect(prepare).toBe(true)
      expect(assetDir).toBe('')
      return expected
    },
  })

  const items = await SearchFile.searchFile('memfs:///test', 'file', true, '')

  expect(items).toEqual(expected)
})

test('searchFile throws for unknown protocols', async () => {
  await expect(SearchFile.searchFile('unknown:///test', 'file', false, '')).rejects.toThrow('No search handler registered for protocol: unknown')
})
