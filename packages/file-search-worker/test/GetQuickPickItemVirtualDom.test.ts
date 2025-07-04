import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../src/parts/VisibleItem/VisibleItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetQuickPickItemVirtualDom from '../src/parts/GetQuickPickItemVirtualDom/GetQuickPickItemVirtualDom.ts'

test('creates basic quick pick item virtual dom', () => {
  const visibleItem: VisibleItem = {
    posInSet: 1,
    setSize: 10,
    label: 'test-label',
    isActive: false,
    highlights: [],
    description: '',
    icon: '',
    fileIcon: '',
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItem,
    role: AriaRoles.Option,
    ariaPosInSet: 1,
    ariaSetSize: 10,
    childCount: 1,
  })
})

test('handles active item', () => {
  const visibleItem: VisibleItem = {
    posInSet: 1,
    setSize: 10,
    label: 'test-label',
    isActive: true,
    highlights: [],
    description: '',
    icon: '',
    fileIcon: '',
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[0].id).toBe('QuickPickItemActive')
  expect(dom[0].className).toContain(ClassNames.QuickPickItemActive)
})

test('adds mask icon when specified', () => {
  const visibleItem: VisibleItem = {
    posInSet: 1,
    setSize: 10,
    label: 'test-label',
    isActive: false,
    highlights: [],
    description: '',
    icon: 'TestIcon',
    fileIcon: '',
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[1]).toEqual({
    type: VirtualDomElements.Div,
    className: 'QuickPickMaskIcon MaskIcon MaskIconTestIcon',
    childCount: 0,
  })
})

test('adds description when specified', () => {
  const visibleItem: VisibleItem = {
    posInSet: 1,
    setSize: 10,
    label: 'test-label',
    isActive: false,
    highlights: [],
    description: 'test-description',
    icon: '',
    fileIcon: '',
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[dom.length - 2]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItemDescription,
    childCount: 1,
  })
  expect(dom[dom.length - 1]).toEqual({
    type: 12,
    text: 'test-description',
    childCount: 0,
  })
})

test('adds highlights for matched text', () => {
  const visibleItem: VisibleItem = {
    posInSet: 1,
    setSize: 10,
    label: 'test-label',
    isActive: false,
    highlights: [
      {
        highlighted: true,
        text: 'test',
      },
      {
        highlighted: false,
        text: '-label',
      },
    ],
    description: '',
    icon: '',
    fileIcon: '',
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  const labelContainer = dom.find((node) => node.className === ClassNames.QuickPickItemLabel)
  expect(labelContainer).toBeDefined()

  const highlightSpan = dom.find((node) => node.className === ClassNames.QuickPickHighlight)
  expect(highlightSpan).toBeDefined()
})
