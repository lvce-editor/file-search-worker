import { expect, test } from '@jest/globals'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetQuickPickItemVirtualDom from '../src/parts/GetQuickPickItemVirtualDom/GetQuickPickItemVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('creates basic quick pick item virtual dom', () => {
  const visibleItem = {
    posInSet: 1,
    setSize: 10,
    label: 'test-label',
    isActive: false,
    matches: [0],
    description: '',
    icon: '',
    fileIcon: null,
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
  const visibleItem = {
    posInSet: 1,
    setSize: 10,
    label: 'test-label',
    isActive: true,
    matches: [0],
    description: '',
    icon: '',
    fileIcon: null,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[0].id).toBe('QuickPickItemActive')
  expect(dom[0].className).toContain(ClassNames.QuickPickItemActive)
})

test('adds mask icon when specified', () => {
  const visibleItem = {
    posInSet: 1,
    setSize: 10,
    label: 'test-label',
    isActive: false,
    matches: [0],
    description: '',
    icon: 'TestIcon',
    fileIcon: null,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[1]).toEqual({
    type: VirtualDomElements.Div,
    className: 'QuickPickMaskIcon MaskIcon MaskIconTestIcon',
    childCount: 0,
  })
})

test('adds description when specified', () => {
  const visibleItem = {
    posInSet: 1,
    setSize: 10,
    label: 'test-label',
    isActive: false,
    matches: [0],
    description: 'test-description',
    icon: '',
    fileIcon: null,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  expect(dom[dom.length - 2]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItemDescription,
    childCount: 1,
  })
  expect(dom[dom.length - 1]).toEqual({
    type: 'text',
    text: 'test-description',
  })
})

test('adds highlights for matched text', () => {
  const visibleItem = {
    posInSet: 1,
    setSize: 10,
    label: 'test-label',
    isActive: false,
    matches: [0, 0, 4],
    description: '',
    icon: '',
    fileIcon: null,
  }
  const dom = GetQuickPickItemVirtualDom.getQuickPickItemVirtualDom(visibleItem)
  const labelContainer = dom.find((node) => node.className === ClassNames.QuickPickItemLabel)
  expect(labelContainer).toBeDefined()

  const highlightSpan = dom.find((node) => node.className === ClassNames.QuickPickHighlight)
  expect(highlightSpan).toBeDefined()
})
