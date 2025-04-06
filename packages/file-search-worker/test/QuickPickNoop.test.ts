import { expect, test } from '@jest/globals'
import * as QuickPickNoop from '../src/parts/QuickPickEntriesNoop/QuickPickNoop.ts'
import * as QuickPickStrings from '../src/parts/QuickPickStrings/QuickPickStrings.ts'

test('name is noop', () => {
  expect(QuickPickNoop.name).toBe('noop')
})

test('getPlaceholder returns empty string', () => {
  expect(QuickPickNoop.getPlaceholder()).toBe('')
})

test('getNoResults returns no results string', () => {
  expect(QuickPickNoop.getNoResults()).toBe(QuickPickStrings.noResults())
})

test('getFilterValue returns input value', () => {
  expect(QuickPickNoop.getFilterValue('test')).toBe('test')
})

test('getPickFilterValue returns input pick', () => {
  expect(QuickPickNoop.getPickFilterValue('test')).toBe('test')
})
