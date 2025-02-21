import { expect, test } from '@jest/globals'
import * as GetKeyBindings from '../src/parts/GetKeyBindings/GetKeyBindings.ts'
import * as KeyCode from '../src/parts/KeyCode/KeyCode.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'

test('returns array of key bindings', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(Array.isArray(keyBindings)).toBe(true)
  expect(keyBindings.length).toBe(6)
})

test('has correct escape key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    key: KeyCode.Escape,
    command: 'Viewlet.closeWidget',
    args: ['QuickPick'],
    when: WhenExpression.FocusQuickPickInput,
  })
})

test('has correct up arrow key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    key: KeyCode.UpArrow,
    command: 'QuickPick.focusPrevious',
    when: WhenExpression.FocusQuickPickInput,
  })
})

test('has correct down arrow key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    key: KeyCode.DownArrow,
    command: 'QuickPick.focusNext',
    when: WhenExpression.FocusQuickPickInput,
  })
})

test('has correct page up key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    key: KeyCode.PageUp,
    command: 'QuickPick.focusFirst',
    when: WhenExpression.FocusQuickPickInput,
  })
})

test('has correct page down key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    key: KeyCode.PageDown,
    command: 'QuickPick.focusLast',
    when: WhenExpression.FocusQuickPickInput,
  })
})

test('has correct enter key binding', () => {
  const keyBindings = GetKeyBindings.getKeyBindings()
  expect(keyBindings).toContainEqual({
    key: KeyCode.Enter,
    command: 'QuickPick.selectCurrentIndex',
    when: WhenExpression.FocusQuickPickInput,
  })
})
