import { expect, test } from '@jest/globals'
import type { QuickPickViewModel } from '../src/parts/QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test.skip('renders items with virtual dom', () => {
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
    totalItems: 1,
  }
  const result = RenderItems.renderItems(newState)
  expect(result).toEqual(['Viewlet.send', 1, RenderMethod.SetItemsDom, expect.any(Array)])
})

test.skip('renders empty items state', () => {
  const newState: QuickPickViewModel = {
    uid: 1,
    visibleItems: [],
    value: '',
    cursorOffset: 0,
    oldFocusedIndex: 0,
    newFocusedIndex: 0,
    height: 0,
    focused: false,
    totalItems: 0,
  }
  const result = RenderItems.renderItems(newState)
  expect(result).toEqual(['Viewlet.send', 1, RenderMethod.SetItemsDom, expect.any(Array)])
})
