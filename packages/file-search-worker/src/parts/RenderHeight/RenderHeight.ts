import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderHeight = (newState: QuickPickViewModel): any => {
  if (newState.height === 0) {
    return ['Viewlet.send', newState.uid, /* method */ RenderMethod.SetItemsHeight, /* height */ 20]
  }
  return ['Viewlet.send', newState.uid, /* method */ RenderMethod.SetItemsHeight, /* height */ newState.height]
}
