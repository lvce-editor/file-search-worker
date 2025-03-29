import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderFocus = (newState: QuickPickViewModel): readonly any[] => {
  return ['Viewlet.focusElementByName', InputName.QuickPickInput]
}
