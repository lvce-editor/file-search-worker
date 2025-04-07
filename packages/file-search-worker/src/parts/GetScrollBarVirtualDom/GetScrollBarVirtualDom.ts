import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
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
      className: MergeClassNames.mergeClassNames(ClassNames.ScrollBar, ClassNames.ScrollBarSmall),
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ScrollBarThumb,
      childCount: 0,
      height: `${sliderHeight}px`,
      top: `${sliderTop}px`,
    },
  ]
}
