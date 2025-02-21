import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders value', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    value: 'test value',
    visibleItems: [],
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
  }
  expect(RenderValue.renderValue(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetValue, 'test value'])
})

test('renders empty value', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    value: '',
    visibleItems: [],
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
  }
  expect(RenderValue.renderValue(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetValue, ''])
})

test('handles different uid', () => {
  const state: QuickPickViewModel = {
    uid: 2,
    value: 'another value',
    visibleItems: [],
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
  }
  expect(RenderValue.renderValue(state)).toEqual(['Viewlet.send', 2, RenderMethod.SetValue, 'another value'])
})
