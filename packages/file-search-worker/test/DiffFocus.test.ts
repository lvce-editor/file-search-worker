import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as DiffFocus from '../src/parts/DiffFocus/DiffFocus.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

const createState = (focused: boolean): QuickPickState => {
  return {
    args: [],
    cursorOffset: 0,
    deltaY: 0,
    fileIconCache: Object.create(null),
    finalDeltaY: 0,
    focused,
    focusedIndex: -1,
    handleOffset: 0,
    headerHeight: 0,
    height: 0,
    icons: [],
    inputSource: 0,
    itemHeight: 0,
    items: [],
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

test('diffType is RenderFocus', () => {
  expect(DiffFocus.diffType).toBe(DiffType.RenderFocus)
})

test('isEqual returns true when focused is the same', () => {
  const oldState = createState(true)
  const newState = createState(true)
  expect(DiffFocus.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when both are false', () => {
  const oldState = createState(false)
  const newState = createState(false)
  expect(DiffFocus.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when focused differs', () => {
  const oldState = createState(true)
  const newState = createState(false)
  expect(DiffFocus.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns false when focused differs reversed', () => {
  const oldState = createState(false)
  const newState = createState(true)
  expect(DiffFocus.isEqual(oldState, newState)).toBe(false)
})
