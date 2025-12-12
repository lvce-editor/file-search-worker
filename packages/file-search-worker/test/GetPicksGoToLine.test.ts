import { expect, test } from '@jest/globals'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { getPicks } from '../src/parts/GetPicksGoToLine/GetPicksGoToLine.ts'

test('returns default picks when value does not start with "::"', async () => {
  const result = await getPicks('')
  expect(result).toHaveLength(6)
  expect(result[0]).toEqual({
    description: '',
    direntType: DirentType.None,
    fileIcon: '',
    icon: '',
    label: '1',
    matches: [],
    uri: '',
  })
  expect(result[1].label).toBe('2')
  expect(result[2].label).toBe('3')
  expect(result[3].label).toBe('4')
  expect(result[4].label).toBe('5')
  expect(result[5].label).toBe('6')
})

test('returns default picks for non-colon value', async () => {
  const result = await getPicks('test')
  expect(result).toHaveLength(6)
  expect(result[0].label).toBe('1')
  expect(result[5].label).toBe('6')
})
