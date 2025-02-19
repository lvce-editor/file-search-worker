import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as CloseWidget from '../CloseWidget/CloseWidget.ts'

export const handleBlur = async (state: QuickPickState): Promise<QuickPickState> => {
  await CloseWidget.closeWidget(state.uid)
  return state
}
