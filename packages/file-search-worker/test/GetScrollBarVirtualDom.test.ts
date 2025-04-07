import { test, expect } from '@jest/globals'
import type { VisibleItem } from '../src/parts/VisibleItem/VisibleItem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetScrollBarVirtualDom from '../src/parts/GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getScrollBarVirtualDom with no scrollbar needed', () => {
  const visibleItems: VisibleItem[] = []
  const result = GetScrollBarVirtualDom.getScrollBarVirtualDom(visibleItems, 5)
  expect(result).toEqual([])
})

test('getScrollBarVirtualDom with scrollbar', () => {
  const visibleItems: VisibleItem[] = [
    {
      posInSet: 0,
      setSize: 20,
      label: 'test',
      isActive: false,
      highlights: [],
      description: '',
      icon: '',
      fileIcon: '',
    },
  ]
  const result = GetScrollBarVirtualDom.getScrollBarVirtualDom(visibleItems, 20)
  expect(result.length).toBe(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickScrollbar,
    childCount: 1,
    style: 'height: 100px;',
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickScrollbarSlider,
    childCount: 0,
    style: expect.stringContaining('height:'),
  })
})
