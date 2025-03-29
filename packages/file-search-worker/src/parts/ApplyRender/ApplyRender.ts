import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as CreateQuickPickViewModel from '../CreateQuickPickViewModel/CreateQuickPickViewModel.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as GetRenderer from '../GetRenderer/GetRenderer.ts'

export const applyRender = async (oldState: QuickPickState, newState: QuickPickState, diffResult: readonly number[]): Promise<readonly any[]> => {
  const commands = []
  const viewModel = await CreateQuickPickViewModel.createQuickPickViewModel(oldState, newState)
  for (const item of diffResult) {
    if (item === DiffType.Height) {
      continue
    }
    if (item === DiffType.RenderFocusedIndex) {
      continue
    }
    const fn = GetRenderer.getRenderer(item)
    commands.push(fn(viewModel))
  }
  return commands
}
