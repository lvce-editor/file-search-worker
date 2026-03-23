import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderCursorOffset from '../src/parts/RenderCursorOffset/RenderCursorOffset.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders cursor offset', () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    cursorOffset: 5,
    uid: 1,
  }

  expect(RenderCursorOffset.renderCursorOffset(state, state)).toEqual(['Viewlet.send', 1, RenderMethod.SetCursorOffset, 5])
})

test('renders cursor offset of 0', () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    cursorOffset: 0,
    uid: 1,
  }

  expect(RenderCursorOffset.renderCursorOffset(state, state)).toEqual(['Viewlet.send', 1, RenderMethod.SetCursorOffset, 0])
})

test('handles different uid', () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    cursorOffset: 10,
    uid: 2,
  }

  expect(RenderCursorOffset.renderCursorOffset(state, state)).toEqual(['Viewlet.send', 2, RenderMethod.SetCursorOffset, 10])
})
