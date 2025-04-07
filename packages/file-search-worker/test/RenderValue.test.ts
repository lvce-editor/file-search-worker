import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'

test.skip('renders value', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    value: 'test value',
    visibleItems: [],
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
    totalItems: 0,
  }

  expect(RenderValue.renderValue(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetValue, 'test value'])
})

test.skip('renders empty value', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    value: '',
    visibleItems: [],
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
    totalItems: 0,
  }

  expect(RenderValue.renderValue(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetValue, ''])
})

test.skip('handles different uid', () => {
  const state: QuickPickViewModel = {
    uid: 2,
    value: 'another value',
    visibleItems: [],
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
    totalItems: 0,
  }

  expect(RenderValue.renderValue(state)).toEqual(['Viewlet.send', 2, RenderMethod.SetValue, 'another value'])
})
