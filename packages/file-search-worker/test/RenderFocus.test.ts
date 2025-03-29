import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'

test.skip('renders focus when focused is true', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    focused: true,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
  }
  expect(RenderFocus.renderFocus(state)).toEqual(['Viewlet.focusSelector', '.InputBox'])
})

test.skip('renders focus when focused is false', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    focused: false,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
  }
  expect(RenderFocus.renderFocus(state)).toEqual(['Viewlet.focusSelector', ''])
})

test.skip('handles different uid', () => {
  const state: QuickPickViewModel = {
    uid: 2,
    focused: true,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
  }
  expect(RenderFocus.renderFocus(state)).toEqual(['Viewlet.focusSelector', '.InputBox'])
})
