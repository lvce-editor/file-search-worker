import { test, expect } from '@jest/globals'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetQuickPickInputVirtualDom from '../src/parts/GetQuickPickInputVirtualDom/GetQuickPickInputVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getQuickPickInputVirtualDom', () => {
  const result = GetQuickPickInputVirtualDom.getQuickPickInputVirtualDom()

  expect(result).toEqual({
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
    onInput: DomEventListenerFunctions.HandleInput,
    onFocus: DomEventListenerFunctions.HandleFocus,
    ariaLabel: expect.any(String),
    ariaAutoComplete: 'list',
    ariaExpanded: true,
    autocomplete: 'off',
  })
})
