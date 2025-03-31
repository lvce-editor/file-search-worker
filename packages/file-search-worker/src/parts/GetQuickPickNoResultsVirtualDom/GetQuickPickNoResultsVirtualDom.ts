import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getQuickPickNoResultsVirtualDom = (): readonly VirtualDomNode[] => {
  const noResults = QuickPickStrings.noResults()
  return [
    {
      type: VirtualDomElements.Div,
      className: 'QuickPickItem QuickPickItemActive QuickPickStatus',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Label,
      childCount: 1,
    },
    text(noResults),
  ]
}
