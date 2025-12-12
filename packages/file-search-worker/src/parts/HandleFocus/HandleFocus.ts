import { WhenExpression } from '@lvce-editor/constants'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Focus from '../Focus/Focus.ts'

export const handleFocus = async (state: QuickPickState): Promise<QuickPickState> => {
  // TODO fix virtual dom diffing so that input isn't destroyed and loses focus when rerendering
  await Focus.setFocus(WhenExpression.FocusQuickPickInput)
  // await CloseWidget.closeWidget(state.uid)
  return state
}
