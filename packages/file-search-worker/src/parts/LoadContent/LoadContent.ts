import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as GetDefaultValue from '../GetDefaultValue/GetDefaultValue.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as QuickPickEntries from '../QuickPickEntries/QuickPickEntries.ts'
import * as QuickPickOpenState from '../QuickPickOpenState/QuickPickOpenState.ts'

export const loadContent = async (state: QuickPickState): Promise<QuickPickState> => {
  const { uri, args } = state
  const value = GetDefaultValue.getDefaultValue(uri)
  const provider = QuickPickEntries.get(uri)
  // @ts-ignore
  if (provider.setArgs) {
    // @ts-ignore
    provider.setArgs(args)
  }
  const newPicks = await provider.getVisibleItems(0, state.maxVisibleItems, 0, value)
  Assert.array(newPicks)
  const minLineY = 0
  const maxLineY = Math.min(minLineY + state.maxVisibleItems, newPicks.length)

  return {
    ...state,
    picks: newPicks,
    items: newPicks,
    focusedIndex: 0,
    state: QuickPickOpenState.Finished,
    minLineY,
    maxLineY,
    value,
    cursorOffset: value.length,
    provider,
    inputSource: InputSource.Script,
    focused: true,
  }
}
