import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'

export const renderFocus = (newState: QuickPickViewModel): readonly any[] => {
  const selector = newState.focused ? '.InputBox' : ''
  return ['Viewlet.focusSelector', selector]
}
