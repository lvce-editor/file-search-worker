import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('renders items with virtual dom', () => {
  const newState: QuickPickViewModel = {
    uid: 1,
    visibleItems: [
      {
        label: 'item 1',
        description: 'desc 1',
        icon: '',
        fileIcon: '/test/icon.png',
        posInSet: 1,
        setSize: 2,
        isActive: true,
        highlights: [],
      },
    ],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
    scrollBarHeight: 0,
    scrollBarTop: 0,
  }
  const result = RenderItems.renderItems(newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})

test('renders empty items state', () => {
  const newState: QuickPickViewModel = {
    uid: 1,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
    scrollBarHeight: 0,
    scrollBarTop: 0,
  }
  const result = RenderItems.renderItems(newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})

test('renders items with scroll bar', () => {
  const newState: QuickPickViewModel = {
    uid: 1,
    visibleItems: [
      {
        label: 'item 1',
        description: 'desc 1',
        icon: '',
        fileIcon: '/test/icon.png',
        posInSet: 1,
        setSize: 2,
        isActive: true,
        highlights: [],
      },
    ],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
    scrollBarHeight: 100,
    scrollBarTop: 50,
  }
  const result = RenderItems.renderItems(newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})
