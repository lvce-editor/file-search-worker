import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderValue = (newState: QuickPickViewModel): any => {
  return ['Viewlet.send', newState.uid, /* method */ RenderMethod.SetValue, /* value */ newState.value]
}
