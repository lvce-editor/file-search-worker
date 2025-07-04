import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetQuickPickInputVirtualDom from '../GetQuickPickInputVirtualDom/GetQuickPickInputVirtualDom.ts'

export const getQuickPickHeaderVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.QuickPickHeader,
      childCount: 1,
    },
    GetQuickPickInputVirtualDom.getQuickPickInputVirtualDom(),
  ]
}
