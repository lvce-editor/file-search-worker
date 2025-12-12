import { expect, test } from '@jest/globals'
import type { QuickPickState } from '../src/parts/QuickPickState/QuickPickState.ts'
import * as ApplyRender from '../src/parts/ApplyRender/ApplyRender.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as QuickPickStates from '../src/parts/QuickPickStates/QuickPickStates.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'

const createState = (focusedIndex: number): QuickPickState => {
  return {
    ...CreateDefaultState.createDefaultState(),
    focusedIndex,
  }
}

test('render2 returns empty array when oldState equals newState', () => {
  const uid = 1
  const state = createState(0)
  QuickPickStates.set(uid, state, state)
  const diffResult: readonly number[] = [1, 2, 3]
  const result = Render2.render2(uid, diffResult)
  expect(result).toEqual([])
})

test('render2 calls applyRender and returns commands when states differ', () => {
  const uid = 2
  const oldState = createState(0)
  const newState = createState(1)
  QuickPickStates.set(uid, oldState, oldState)
  const diffResult: readonly number[] = [1, 2]
  const mockCommands: readonly unknown[] = [{ type: 'command1' }, { type: 'command2' }]
  const originalApplyRender = ApplyRender.applyRender
  let capturedOldState: QuickPickState | undefined
  let capturedNewState: QuickPickState | undefined
  let capturedDiffResult: readonly number[] | undefined
  // @ts-ignore
  ApplyRender.applyRender = (
    oldState: QuickPickState,
    newState: QuickPickState,
    diffResult: readonly number[],
  ): readonly unknown[] => {
    capturedOldState = oldState
    capturedNewState = newState
    capturedDiffResult = diffResult
    return mockCommands
  }
  const result = Render2.render2(uid, diffResult)
  expect(capturedOldState).toBe(oldState)
  expect(capturedNewState).toBe(newState)
  expect(capturedDiffResult).toBe(diffResult)
  expect(result).toBe(mockCommands)
  const { oldState: updatedOldState, newState: updatedNewState } = QuickPickStates.get(uid)
  expect(updatedOldState).toBe(newState)
  expect(updatedNewState).toBe(newState)
  // @ts-ignore
  ApplyRender.applyRender = originalApplyRender
})

test('render2 updates QuickPickStates when states differ', () => {
  const uid = 3
  const oldState = createState(0)
  const newState = createState(2)
  QuickPickStates.set(uid, oldState, oldState)
  const diffResult: readonly number[] = []
  const mockCommands: readonly unknown[] = []
  const originalApplyRender = ApplyRender.applyRender
  // @ts-ignore
  ApplyRender.applyRender = (): readonly unknown[] => {
    return mockCommands
  }
  Render2.render2(uid, diffResult)
  const { oldState: updatedOldState, newState: updatedNewState } = QuickPickStates.get(uid)
  expect(updatedOldState).toBe(newState)
  expect(updatedNewState).toBe(newState)
  // @ts-ignore
  ApplyRender.applyRender = originalApplyRender
})

