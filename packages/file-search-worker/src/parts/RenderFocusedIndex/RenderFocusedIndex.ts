import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderFocusedIndex = (newState: QuickPickViewModel): readonly any[] => {
  return [
    'Viewlet.send',
    newState.uid,
    /* method */ RenderMethod.SetFocusedIndex,
    /* oldFocusedIndex */ newState.oldFocusedIndex,
    /* newFocusedIndex */ newState.newFocusedIndex,
  ]
}
