import { test, expect } from '@jest/globals'
import * as GetQuickPickNoResultsVirtualDom from '../src/parts/GetQuickPickNoResultsVirtualDom/GetQuickPickNoResultsVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'

test('getQuickPickNoResultsVirtualDom', () => {
  const result = GetQuickPickNoResultsVirtualDom.getQuickPickNoResultsVirtualDom()

  expect(result.length).toBe(3)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'QuickPickItem QuickPickItemActive QuickPickStatus',
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Label,
    childCount: 1,
  })
  expect(result[2].type).toBeDefined()
  expect(typeof result[2].text).toBe('string')
})
