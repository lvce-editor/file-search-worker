import { expect, test } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetScrollBarVirtualDom from '../src/parts/GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test.skip('getScrollBarVirtualDom with no scrollbar needed', () => {
  const scrollBarHeight = 0
  const scrollBarTop = 20
  const result = GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarTop)
  expect(result).toEqual([])
})

test.skip('getScrollBarVirtualDom with scrollbar', () => {
  const scrollBarHeight = 100
  const scrollBarTop = 20
  const result = GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollBarHeight, scrollBarTop)
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
