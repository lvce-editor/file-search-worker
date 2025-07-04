import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetQuickPickHeaderVirtualDom from '../src/parts/GetQuickPickHeaderVirtualDom/GetQuickPickHeaderVirtualDom.ts'
import * as GetQuickPickInputVirtualDom from '../src/parts/GetQuickPickInputVirtualDom/GetQuickPickInputVirtualDom.ts'

test('getQuickPickHeaderVirtualDom', () => {
  const result = GetQuickPickHeaderVirtualDom.getQuickPickHeaderVirtualDom()

  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.QuickPickHeader,
      childCount: 1,
    },
    GetQuickPickInputVirtualDom.getQuickPickInputVirtualDom(),
  ])
})
