import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'

export const handleClickAt = (state: QuickPickState, x: number, y: number): Promise<QuickPickState> => {
  const { top, headerHeight, itemHeight } = state
  const relativeY = y - top - headerHeight
  const index = Math.floor(relativeY / itemHeight)
  return selectIndex(state, index)
}
