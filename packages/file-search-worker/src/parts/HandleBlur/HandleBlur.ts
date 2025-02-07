import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Rpc from '../Rpc/Rpc.ts'

export const handleBlur = async (state: QuickPickState): Promise<QuickPickState> => {
  await Rpc.invoke('Viewlet.closeWidget', state.uid)
  return state
}
