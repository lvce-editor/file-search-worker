import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as DiffItems from '../src/parts/DiffItems/DiffItems.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

const createState = ({
  focusedIndex,
  items,
  maxLineY,
  minLineY,
}: {
  items: readonly any[]
  minLineY: number
  maxLineY: number
  focusedIndex: number
}): QuickPickState => {
  return {
    args: [],
    cursorOffset: 0,
    deltaY: 0,
    fileIconCache: Object.create(null),
    finalDeltaY: 0,
    focused: false,
    focusedIndex,
    handleOffset: 0,
    headerHeight: 0,
    height: 0,
    icons: [],
    inputSource: 0,
    itemHeight: 0,
    items,
    maxLineY,
    maxVisibleItems: 0,
    minLineY,
    minimumSliderSize: 0,
    picks: [],
    platform: 0,
    providerId: 0,
    recentPickIds: new Map(),
    recentPicks: [],
    scrollBarActive: false,
    scrollBarHeight: 0,
    scrollBarY: 0,
    state: 0,
    top: 0,
    touchDifference: 0,
    touchOffsetY: 0,
    touchTimeStamp: 0,
    uid: 0,
    uri: '',
    value: '',
    versionId: 0,
    warned: [],
    width: 0,
    workspaceUri: '',
    x: 0,
    y: 0,
  }
}

const items1 = [{ label: 'item1' }]
const items2 = [{ label: 'item2' }]

test('diffType is RenderItems', () => {
  expect(DiffItems.diffType).toBe(DiffType.RenderItems)
})

test('isEqual returns true when all properties are the same', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  expect(DiffItems.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when items differ', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items: items2,
    maxLineY: 1,
    minLineY: 0,
  })
  expect(DiffItems.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when minLineY differs', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 1,
  })
  expect(DiffItems.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when maxLineY differs', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 2,
    minLineY: 0,
  })
  expect(DiffItems.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when focusedIndex differs', () => {
  const oldState = createState({
    focusedIndex: 0,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  const newState = createState({
    focusedIndex: 1,
    items: items1,
    maxLineY: 1,
    minLineY: 0,
  })
  expect(DiffItems.isEqual(oldState, newState)).toBe(false)
})
