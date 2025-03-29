import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderFocus = (newState: QuickPickViewModel): readonly any[] => {
  if (newState.renderAllItems) {
    return ['Viewlet.focusElementByName', InputName.QuickPickInput]
  }
  const selector = newState.focused ? '.InputBox' : ''
  return ['Viewlet.focusSelector', selector]
}
