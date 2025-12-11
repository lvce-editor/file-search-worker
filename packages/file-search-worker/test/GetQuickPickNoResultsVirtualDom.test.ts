import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetQuickPickNoResultsVirtualDom from '../src/parts/GetQuickPickNoResultsVirtualDom/GetQuickPickNoResultsVirtualDom.ts'

test('getQuickPickNoResultsVirtualDom', () => {
  const result = GetQuickPickNoResultsVirtualDom.getQuickPickNoResultsVirtualDom()

  expect(result.length).toBe(3)
  expect(result[0]).toEqual({
    childCount: 1,
    className: 'QuickPickItem QuickPickItemActive QuickPickStatus',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 1,
    className: ClassNames.Label,
    type: VirtualDomElements.Div,
  })
  expect(result[2].type).toBeDefined()
  expect(typeof result[2].text).toBe('string')
})
