import { test, expect } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetQuickPickHeaderVirtualDom from '../src/parts/GetQuickPickHeaderVirtualDom/GetQuickPickHeaderVirtualDom.ts'
import * as GetQuickPickInputVirtualDom from '../src/parts/GetQuickPickInputVirtualDom/GetQuickPickInputVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

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
