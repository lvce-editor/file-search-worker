import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getScrollBarVirtualDom = (visibleItems: readonly VisibleItem[], totalItems: number): readonly VirtualDomNode[] => {
  const maxVisibleItems = 10
  const shouldShowScrollbar = totalItems > maxVisibleItems
  if (!shouldShowScrollbar) {
    return []
  }

  const scrollbarHeight = 100
  const sliderHeight = Math.max((maxVisibleItems / totalItems) * scrollbarHeight, 20)
  const sliderTop = ((visibleItems[0]?.posInSet || 0) / totalItems) * (scrollbarHeight - sliderHeight)

  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.QuickPickScrollbar,
      childCount: 1,
      style: `height: ${scrollbarHeight}px;`,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.QuickPickScrollbarSlider,
      childCount: 0,
      style: `height: ${sliderHeight}px; top: ${sliderTop}px;`,
    },
  ]
}
