import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderCursorOffset from '../src/parts/RenderCursorOffset/RenderCursorOffset.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders cursor offset', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    cursorOffset: 5,
    visibleItems: [],
    value: '',
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
    scrollBarHeight: 0,
    scrollBarTop: 0,
  }

  expect(RenderCursorOffset.renderCursorOffset(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetCursorOffset, 5])
})

test('renders cursor offset of 0', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    cursorOffset: 0,
    visibleItems: [],
    value: '',
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
    scrollBarHeight: 0,
    scrollBarTop: 0,
  }

  expect(RenderCursorOffset.renderCursorOffset(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetCursorOffset, 0])
})

test('handles different uid', () => {
  const state: QuickPickViewModel = {
    uid: 2,
    cursorOffset: 10,
    visibleItems: [],
    value: '',
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
    scrollBarHeight: 0,
    scrollBarTop: 0,
  }

  expect(RenderCursorOffset.renderCursorOffset(state)).toEqual(['Viewlet.send', 2, RenderMethod.SetCursorOffset, 10])
})
