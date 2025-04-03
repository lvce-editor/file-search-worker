import { test, expect } from '@jest/globals'
import * as GetPlaceholderValue from '../src/parts/GetPlaceholderValue/GetPlaceholderValue.ts'
import * as QuickPickStrings from '../src/parts/QuickPickStrings/QuickPickStrings.ts'

test('getPlaceholderValue returns command placeholder for command provider', () => {
  expect(GetPlaceholderValue.getPlaceholderValue('command')).toBe(QuickPickStrings.typeNameofCommandToRun())
})

test('getPlaceholderValue returns color theme placeholder for colorTheme provider', () => {
  expect(GetPlaceholderValue.getPlaceholderValue('colorTheme')).toBe(QuickPickStrings.selectColorTheme())
})

test('getPlaceholderValue returns open recent placeholder for openRecent provider', () => {
  expect(GetPlaceholderValue.getPlaceholderValue('openRecent')).toBe(QuickPickStrings.selectToOpen())
})

test('getPlaceholderValue returns view placeholder for view provider', () => {
  expect(GetPlaceholderValue.getPlaceholderValue('view')).toBe(QuickPickStrings.typeNameofCommandToRun())
})

test('getPlaceholderValue returns empty string for unknown provider', () => {
  expect(GetPlaceholderValue.getPlaceholderValue('unknown')).toBe('')
})
