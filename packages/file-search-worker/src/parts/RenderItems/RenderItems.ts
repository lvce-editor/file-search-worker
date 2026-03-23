import { ViewletCommand } from '@lvce-editor/constants'
import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as CreateQuickPickViewModel from '../CreateQuickPickViewModel/CreateQuickPickViewModel.ts'
import * as GetQuickPickVirtualDom from '../GetQuickPickVirtualDom/GetQuickPickVirtualDom.ts'

export const getItemsDom = (newState: QuickPickState): readonly unknown[] => {
  const viewModel = CreateQuickPickViewModel.createQuickPickViewModel(newState)
  const { scrollBarHeight, scrollBarTop, visibleItems } = viewModel
  const dom = GetQuickPickVirtualDom.getQuickPickVirtualDom(visibleItems, scrollBarHeight, scrollBarTop)
  return dom
}

export const renderItems = (_oldState: QuickPickState, newState: QuickPickState): readonly unknown[] => {
  const dom = getItemsDom(newState)
  return [ViewletCommand.SetDom2, dom]
}
