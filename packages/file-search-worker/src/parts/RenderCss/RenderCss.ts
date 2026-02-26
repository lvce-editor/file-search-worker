import { ViewletCommand } from '@lvce-editor/constants'
import type { QuickPickViewModel } from '../QuickPickViewModel/QuickPickViewModel.ts'
import { getCss } from '../GetCss/GetCss.ts'

export const renderCss = (newState: QuickPickViewModel): any => {
  const { height, uid } = newState
  const css = getCss(height, 20)
  return [ViewletCommand.SetCss, uid, css]
}
