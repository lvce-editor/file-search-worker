import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getQuickPickHeaderVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.QuickPickHeader,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Input,
      className: ClassNames.InputBox,
      spellcheck: false,
      autocapitalize: 'off',
      inputType: 'text',
      childCount: 0,
    },
  ]
}
