import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as GetIndex from '../GetIndex/GetIndex.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'

export const handleClickAt = (state: QuickPickState, x: number, y: number): Promise<QuickPickState> => {
  const { top, headerHeight, itemHeight } = state
  const index = GetIndex.getIndex(top, headerHeight, itemHeight, y)
  return selectIndex(state, index)
}
