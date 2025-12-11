import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../src/parts/VisibleItem/VisibleItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetQuickPickItemVirtualDom from '../src/parts/GetQuickPickItemVirtualDom/GetQuickPickItemVirtualDom.ts'

test('creates basic quick pick item virtual dom', () => {
  const visibleItem: VisibleItem = {
    description: '',
    fileIcon: '',
    highlights: [],
    icon: '',
    isActive: false,
    label: 'test-label',
    posInSet: 1,
    setSize: 10,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[0]).toEqual({
    ariaPosInSet: 1,
    ariaSetSize: 10,
    childCount: 1,
    className: ClassNames.QuickPickItem,
    role: AriaRoles.Option,
    type: VirtualDomElements.Div,
  })
})

test('handles active item', () => {
  const visibleItem: VisibleItem = {
    description: '',
    fileIcon: '',
    highlights: [],
    icon: '',
    isActive: true,
    label: 'test-label',
    posInSet: 1,
    setSize: 10,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[0].id).toBe('QuickPickItemActive')
  expect(dom[0].className).toContain(ClassNames.QuickPickItemActive)
})

test('adds mask icon when specified', () => {
  const visibleItem: VisibleItem = {
    description: '',
    fileIcon: '',
    highlights: [],
    icon: 'TestIcon',
    isActive: false,
    label: 'test-label',
    posInSet: 1,
    setSize: 10,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[1]).toEqual({
    childCount: 0,
    className: 'QuickPickMaskIcon MaskIcon MaskIconTestIcon',
    type: VirtualDomElements.Div,
  })
})

test('adds description when specified', () => {
  const visibleItem: VisibleItem = {
    description: 'test-description',
    fileIcon: '',
    highlights: [],
    icon: '',
    isActive: false,
    label: 'test-label',
    posInSet: 1,
    setSize: 10,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[dom.length - 2]).toEqual({
    childCount: 1,
    className: ClassNames.QuickPickItemDescription,
    type: VirtualDomElements.Div,
  })
  expect(dom[dom.length - 1]).toEqual({
    childCount: 0,
    text: 'test-description',
    type: 12,
  })
})

test('adds highlights for matched text', () => {
  const visibleItem: VisibleItem = {
    description: '',
    fileIcon: '',
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
    icon: '',
    isActive: false,
    label: 'test-label',
    posInSet: 1,
    setSize: 10,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  const labelContainer = dom.find((node) => node.className === ClassNames.QuickPickItemLabel)
  expect(labelContainer).toBeDefined()

  const highlightSpan = dom.find((node) => node.className === ClassNames.QuickPickHighlight)
  expect(highlightSpan).toBeDefined()
})
