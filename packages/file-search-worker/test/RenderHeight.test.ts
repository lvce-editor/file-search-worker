import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderHeight from '../src/parts/RenderHeight/RenderHeight.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renders height', () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    height: 100,
    uid: 1,
  }
  expect(RenderHeight.renderHeight(state, state)).toEqual(['Viewlet.send', 1, RenderMethod.SetItemsHeight, 100])
})

test('renders default height when height is 0', () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    height: 0,
    uid: 1,
  }
  expect(RenderHeight.renderHeight(state, state)).toEqual(['Viewlet.send', 1, RenderMethod.SetItemsHeight, 20])
})

test('handles different uid', () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    height: 200,
    uid: 2,
  }
  expect(RenderHeight.renderHeight(state, state)).toEqual(['Viewlet.send', 2, RenderMethod.SetItemsHeight, 200])
})
