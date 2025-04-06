import { test, expect } from '@jest/globals'
import type { VisibleItem } from '../src/parts/VisibleItem/VisibleItem.ts'
import * as GetQuickPickItemsVirtualDom from '../src/parts/GetQuickPickItemsVirtualDom/GetQuickPickItemsVirtualDom.ts'
import * as GetQuickPickItemVirtualDom from '../src/parts/GetQuickPickItemVirtualDom/GetQuickPickItemVirtualDom.ts'
import * as GetQuickPickNoResultsVirtualDom from '../src/parts/GetQuickPickNoResultsVirtualDom/GetQuickPickNoResultsVirtualDom.ts'

test('getQuickPickItemsVirtualDom - empty items', () => {
  const result = GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom([])
  expect(result).toEqual(GetQuickPickNoResultsVirtualDom.getQuickPickNoResultsVirtualDom())
})

test('getQuickPickItemsVirtualDom - with items', () => {
  const visibleItems: readonly VisibleItem[] = [
    {
      label: 'item1',
      description: 'desc1',
      fileIcon: 'file1',
      icon: 'icon1',
      isActive: false,
      highlights: [],
      posInSet: 1,
      setSize: 2,
    },
    {
      label: 'item2',
      description: 'desc2',
      fileIcon: 'file2',
      icon: 'icon2',
      isActive: false,
      highlights: [],
      posInSet: 2,
      setSize: 2,
    },
  ]
  const result = GetQuickPickItemsVirtualDom.getQuickPickItemsVirtualDom(visibleItems)
  const expected = [
    ...GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItems[0]),
    ...GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItems[1]),
  ]
  expect(result).toEqual(expected)
})
