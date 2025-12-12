import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as DiffFocusedIndex from '../src/parts/DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

const createState = (focusedIndex: number): QuickPickState => {
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
    items: [],
    maxLineY: 0,
    maxVisibleItems: 0,
    minimumSliderSize: 0,
    minLineY: 0,
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

test('diffType is RenderFocusedIndex', () => {
  expect(DiffFocusedIndex.diffType).toBe(DiffType.RenderFocusedIndex)
})

test('isEqual returns true when focusedIndex is the same', () => {
  const oldState = createState(0)
  const newState = createState(0)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when both are -1', () => {
  const oldState = createState(-1)
  const newState = createState(-1)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when both are positive', () => {
  const oldState = createState(5)
  const newState = createState(5)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when focusedIndex differs', () => {
  const oldState = createState(0)
  const newState = createState(1)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when one is -1 and other is not', () => {
  const oldState = createState(-1)
  const newState = createState(0)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(false)
})
