import { test, expect } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'

test('renderFocus', () => {
  const viewModel: QuickPickViewModel = {
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 300,
    focused: true,
    uid: 1,
    totalItems: 0,
  }

  const result = RenderFocus.renderFocus(viewModel)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

test('renders focus when focused is true', () => {
  const viewModel: QuickPickViewModel = {
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 300,
    focused: true,
    uid: 1,
    totalItems: 0,
  }

  const result = RenderFocus.renderFocus(viewModel)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

test('renders focus when focused is false', () => {
  const viewModel: QuickPickViewModel = {
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 300,
    focused: false,
    uid: 1,
    totalItems: 0,
  }

  const result = RenderFocus.renderFocus(viewModel)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})

test('handles different uid', () => {
  const viewModel: QuickPickViewModel = {
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 300,
    focused: true,
    uid: 2,
    totalItems: 0,
  }

  const result = RenderFocus.renderFocus(viewModel)

  expect(result).toEqual(['Viewlet.focusElementByName', InputName.QuickPickInput])
})
