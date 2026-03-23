import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('renders items with virtual dom', () => {
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    icons: ['/test/icon.png'],
    items: [
      {
        description: 'desc 1',
        direntType: 0,
        fileIcon: '/test/icon.png',
        icon: '',
        label: 'item 1',
        matches: [],
        uri: 'uri1',
      },
    ],
    maxLineY: 1,
    minLineY: 0,
    uid: 1,
  }
  const result = RenderItems.renderItems(newState, newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})

test('renders empty items state', () => {
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    uid: 1,
  }
  const result = RenderItems.renderItems(newState, newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})

test('renders items with scroll bar', () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    description: '',
    direntType: 0,
    fileIcon: '',
    icon: '',
    label: `item ${i}`,
    matches: [],
    uri: `uri${i}`,
  }))
  const newState: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex: 0,
    icons: Array.from({length: 20}).fill('/test/icon.png'),
    items,
    maxLineY: 10,
    minLineY: 0,
    uid: 1,
  }
  const result = RenderItems.renderItems(newState, newState)
  expect(result[0]).toBe('Viewlet.setDom2')
  expect(result[1]).toBeDefined()
})
