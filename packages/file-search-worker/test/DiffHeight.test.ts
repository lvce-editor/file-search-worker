import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as DiffHeight from '../src/parts/DiffHeight/DiffHeight.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

const createState = (itemsLength: number): QuickPickState => {
  return {
    args: [],
    cursorOffset: 0,
    deltaY: 0,
    fileIconCache: Object.create(null),
    finalDeltaY: 0,
    focused: false,
    focusedIndex: -1,
    handleOffset: 0,
    headerHeight: 0,
    height: 0,
    icons: [],
    inputSource: 0,
    itemHeight: 0,
    items: Array(itemsLength).fill(null),
    maxLineY: 0,
    maxVisibleItems: 0,
    minLineY: 0,
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

test('diffType is Height', () => {
  expect(DiffHeight.diffType).toBe(DiffType.Height)
})

test('isEqual returns true when items length is the same', () => {
  const oldState = createState(0)
  const newState = createState(0)
  expect(DiffHeight.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when both have same non-zero length', () => {
  const oldState = createState(5)
  const newState = createState(5)
  expect(DiffHeight.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when items length differs', () => {
  const oldState = createState(0)
  const newState = createState(1)
  expect(DiffHeight.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when items length differs reversed', () => {
  const oldState = createState(5)
  const newState = createState(3)
  expect(DiffHeight.isEqual(oldState, newState)).toBe(false)
})
