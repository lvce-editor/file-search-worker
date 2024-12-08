import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as KeyCode from '../KeyCode/KeyCode.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      key: KeyCode.Escape,
      command: 'Viewlet.closeWidget',
      args: ['QuickPick'],
      when: WhenExpression.FocusQuickPickInput,
    },
    {
      key: KeyCode.UpArrow,
      command: 'QuickPick.focusPrevious',
      when: WhenExpression.FocusQuickPickInput,
    },
    {
      key: KeyCode.DownArrow,
      command: 'QuickPick.focusNext',
      when: WhenExpression.FocusQuickPickInput,
    },
    {
      key: KeyCode.PageUp,
      command: 'QuickPick.focusFirst',
      when: WhenExpression.FocusQuickPickInput,
    },
    {
      key: KeyCode.PageDown,
      command: 'QuickPick.focusLast',
      when: WhenExpression.FocusQuickPickInput,
    },
    {
      key: KeyCode.Enter,
      command: 'QuickPick.selectCurrentIndex',
      when: WhenExpression.FocusQuickPickInput,
    },
  ]
}
