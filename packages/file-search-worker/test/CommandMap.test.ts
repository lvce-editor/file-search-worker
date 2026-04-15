import { expect, test } from '@jest/globals'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.ts'
import * as SearchFile from '../src/parts/SearchFile/SearchFile.ts'

test('commandMap exposes only file search commands', () => {
  expect(CommandMap.commandMap).toEqual({
    'FileSearch.searchFile': SearchFile.searchFile,
    'SearchFile.searchFile': SearchFile.searchFile,
  })
})