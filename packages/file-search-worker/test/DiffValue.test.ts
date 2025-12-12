import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as DiffValue from '../src/parts/DiffValue/DiffValue.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

const createQuickPickState = (value: string, inputSource: number): QuickPickState => {
  return {
    args: [],
    cursorOffset: 0,
    deltaY: 0,
    fileIconCache: Object.create(null),
    finalDeltaY: 0,
    focused: false,
    focusedIndex: 0,
    handleOffset: 0,
    headerHeight: 0,
    height: 0,
    icons: [],
    inputSource,
    itemHeight: 0,
    items: [],
    maxLineY: 0,
    maxVisibleItems: 0,
    minimumSliderSize: 0,
    minLineY: 0,
    picks: [],
    platform: 0,
    providerId: 0,
    recentPickIds: Object.create(null),
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
    value,
    versionId: 0,
    warned: [],
    width: 0,
    workspaceUri: '',
    x: 0,
    y: 0,
  }
}

test('diffType is RenderValue', () => {
  expect(DiffValue.diffType).toBe(DiffType.RenderValue)
})

test('isEqual returns true when newState inputSource is User', () => {
  const oldState = createQuickPickState('old value', InputSource.Script)
  const newState = createQuickPickState('new value', InputSource.User)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when values are equal', () => {
  const oldState = createQuickPickState('same value', InputSource.Script)
  const newState = createQuickPickState('same value', InputSource.Script)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when values are equal and inputSource is User', () => {
  const oldState = createQuickPickState('same value', InputSource.User)
  const newState = createQuickPickState('same value', InputSource.User)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns false when values differ and inputSource is not User', () => {
  const oldState = createQuickPickState('old value', InputSource.Script)
  const newState = createQuickPickState('new value', InputSource.Script)

  expect(DiffValue.isEqual(oldState, newState)).toBe(false)
})

test('isEqual returns true when newState inputSource is User even with different values', () => {
  const oldState = createQuickPickState('old value', InputSource.Script)
  const newState = createQuickPickState('completely different value', InputSource.User)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when both values are empty strings', () => {
  const oldState = createQuickPickState('', InputSource.Script)
  const newState = createQuickPickState('', InputSource.Script)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})

test('isEqual returns true when newState inputSource is User and oldState value is empty', () => {
  const oldState = createQuickPickState('', InputSource.Script)
  const newState = createQuickPickState('new value', InputSource.User)

  expect(DiffValue.isEqual(oldState, newState)).toBe(true)
})
