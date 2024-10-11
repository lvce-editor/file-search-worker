import { expect, test } from '@jest/globals'
import * as SearchFile from '../src/parts/SearchFile/SearchFile.ts'

test('searchFile', async () => {
  const workspace = '/test'
  const searchValue = 'test'
  const items = await SearchFile.searchFile(workspace, searchValue)
  expect(items).toEqual([])
})
