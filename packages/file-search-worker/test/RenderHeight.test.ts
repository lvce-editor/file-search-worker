import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderHeight from '../src/parts/RenderHeight/RenderHeight.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders height', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    height: 100,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    focused: false,
  }
  expect(RenderHeight.renderHeight(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetItemsHeight, 100])
})

test('renders default height when height is 0', () => {
  const state: QuickPickViewModel = {
    uid: 1,
    height: 0,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    focused: false,
  }
  expect(RenderHeight.renderHeight(state)).toEqual(['Viewlet.send', 1, RenderMethod.SetItemsHeight, 20])
})

test('handles different uid', () => {
  const state: QuickPickViewModel = {
    uid: 2,
    height: 200,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    focused: false,
  }
  expect(RenderHeight.renderHeight(state)).toEqual(['Viewlet.send', 2, RenderMethod.SetItemsHeight, 200])
})
