import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'
import * as QuickPickStrings from '../QuickPickStrings/QuickPickStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getQuickPickHeaderVirtualDom = (): readonly VirtualDomNode[] => {
  const ariaLabel = QuickPickStrings.typeNameofCommandToRun()
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
      role: AriaRoles.ComboBox,
      name: InputName.QuickPickInput,
      onBeforeInput: DomEventListenerFunctions.HandleBeforeInput,
      onBlur: DomEventListenerFunctions.HandleBlur,
      ariaLabel: ariaLabel,
    },
  ]
}
