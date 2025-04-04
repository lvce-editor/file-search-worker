import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as CloseWidget from '../CloseWidget/CloseWidget.ts'
import * as GetPick from '../GetPick/GetPick.ts'
import * as QuickPickReturnValue from '../QuickPickReturnValue/QuickPickReturnValue.ts'

export const selectIndex = async (state: QuickPickState, index: number, button = /* left */ 0): Promise<QuickPickState> => {
  const { minLineY, provider, items } = state
  const actualIndex = index + minLineY
  const pick = GetPick.getPick(items, actualIndex)
  // @ts-ignore
  const selectPickResult = await provider.selectPick(pick, actualIndex, button)
  Assert.object(selectPickResult)
  Assert.string(selectPickResult.command)
  const { command } = selectPickResult
  switch (command) {
    case QuickPickReturnValue.Hide:
      await CloseWidget.closeWidget(state.uid)
      return state
    default:
      return state
  }

  // TODO recent picks should be per provider
  // if (!state.recentPickIds.has(pick.id)) {
  //   state.recentPicks.unshift(pick)
  //   state.recentPickIds.add(pick.id)
  // }
  // if (state.recentPicks.length > RECENT_PICKS_MAX_SIZE) {
  //   const last = state.recentPicks.pop()
  //   state.recentPickIds.delete(last.id)
  // }
}
