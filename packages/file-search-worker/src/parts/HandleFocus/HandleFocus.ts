import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Focus from '../Focus/Focus.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const handleFocus = async (state: QuickPickState): Promise<QuickPickState> => {
  if (state.focused) {
    return state
  }
  // TODO fix virtual dom diffing so that input isn't destroyed and loses focus when rerendering
  await Focus.setFocus(WhenExpression.FocusQuickPickInput)
  // await CloseWidget.closeWidget(state.uid)
  return {
    ...state,
    focused: true,
  }
}
