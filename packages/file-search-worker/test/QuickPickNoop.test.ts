import { expect, test } from '@jest/globals'
import * as QuickPickNoop from '../src/parts/QuickPickEntriesNoop/QuickPickNoop.ts'
import * as QuickPickReturnValue from '../src/parts/QuickPickReturnValue/QuickPickReturnValue.ts'
import * as QuickPickStrings from '../src/parts/QuickPickStrings/QuickPickStrings.ts'

test('name is noop', () => {
  expect(QuickPickNoop.name).toBe('noop')
})

test('getPlaceholder returns empty string', () => {
  expect(QuickPickNoop.getPlaceholder()).toBe('')
})

test('getHelpEntries returns empty array', () => {
  expect(QuickPickNoop.getHelpEntries()).toEqual([])
})

test('getNoResults returns no results string', () => {
  expect(QuickPickNoop.getNoResults()).toBe(QuickPickStrings.noResults())
})

test('getPicks returns empty array', async () => {
  expect(await QuickPickNoop.getPicks('')).toEqual([])
})

test('selectPick returns hide command', async () => {
  expect(await QuickPickNoop.selectPick({})).toEqual({
    command: QuickPickReturnValue.Hide,
  })
})

test('getFilterValue returns input value', () => {
  expect(QuickPickNoop.getFilterValue('test')).toBe('test')
})

test('getPickFilterValue returns input pick', () => {
  expect(QuickPickNoop.getPickFilterValue('test')).toBe('test')
})
