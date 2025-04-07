import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderFocusedIndex from '../src/parts/RenderFocusedIndex/RenderFocusedIndex.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders focused index', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    oldFocusedIndex: 0,
    newFocusedIndex: 1,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    height: 0,
    focused: false,
    scrollBarHeight: 0,
    scrollBarTop: 0,
  }
  expect(RenderFocusedIndex.renderFocusedIndex(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetFocusedIndex, 0, 1])
})

test('handles negative focused index', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    oldFocusedIndex: -1,
    newFocusedIndex: 0,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    height: 0,
    focused: false,
    scrollBarHeight: 0,
    scrollBarTop: 0,
  }
  expect(RenderFocusedIndex.renderFocusedIndex(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetFocusedIndex, -1, 0])
})

test('handles different uid', () => {
  const state: QuickPickViewModel = {
    uid: 2,
    oldFocusedIndex: 1,
    newFocusedIndex: 2,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    height: 0,
    focused: false,
    scrollBarHeight: 0,
    scrollBarTop: 0,
  }
  expect(RenderFocusedIndex.renderFocusedIndex(state)).toEqual(['Viewlet.send', 2, RenderMethod.SetFocusedIndex, 1, 2])
})
