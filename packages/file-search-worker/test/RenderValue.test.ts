import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'

test('renders value', () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test value',
  }

  expect(RenderValue.renderValue(state, state)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, 'test value'])
})

test('renders empty value', () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    value: '',
  }

  expect(RenderValue.renderValue(state, state)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, ''])
})

test('handles different values', () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'another value',
  }

  expect(RenderValue.renderValue(state, state)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, 'another value'])
})

test('handles special characters in value', () => {
  const state: QuickPickState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test@example.com',
  }

  expect(RenderValue.renderValue(state, state)).toEqual(['Viewlet.setValueByName', InputName.QuickPickInput, 'test@example.com'])
})
