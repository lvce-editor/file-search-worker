import { expect, test } from '@jest/globals'
import * as QuickPickEntriesNumber from '../src/parts/QuickPickEntriesNumber/QuickPickEntriesNumber.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'

test('name should be number', () => {
  expect(QuickPickEntriesNumber.name).toBe('number')
})

test('getPlaceholder should return empty string', () => {
  expect(QuickPickEntriesNumber.getPlaceholder()).toBe('')
})

test('getHelpEntries should return empty array', () => {
  expect(QuickPickEntriesNumber.getHelpEntries()).toEqual([])
})

test('getNoResults should return object with label', () => {
  expect(QuickPickEntriesNumber.getNoResults()).toEqual({
    label: 'No matching results',
  })
})

test('getPicks should return array of number picks', async () => {
  const picks = await QuickPickEntriesNumber.getPicks()
  expect(picks).toEqual([
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: '10' },
  ])
})

test('selectPick should return hide command', async () => {
  const result = await QuickPickEntriesNumber.selectPick({ label: '1' })
  expect(result).toEqual({
    command: QuickPickReturnValue.Hide,
  })
})
