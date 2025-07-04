import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetHighlights from '../src/parts/GetHighlights/GetHighlights.ts'

test.skip('getHighlights - empty highlights', () => {
  // @ts-ignore
  const result = GetHighlights.getHighlights([], 'test')
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItemLabel,
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: 12,
    text: 'test',
    childCount: 0,
  })
})

test.skip('getHighlights - single highlight', () => {
  // @ts-ignore

  const result = GetHighlights.getHighlights([1, 3], 'test')
  expect(result).toHaveLength(5)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItemLabel,
    childCount: 3,
  })
  expect(result[1]).toEqual({
    type: 12,
    text: 't',
    childCount: 0,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.QuickPickHighlight,
    childCount: 1,
  })
  expect(result[3]).toEqual({
    type: 12,
    text: 'es',
    childCount: 0,
  })
  expect(result[4]).toEqual({
    type: 12,
    text: 't',
    childCount: 0,
  })
})

test.skip('getHighlights - multiple highlights', () => {
  // @ts-ignore

  const result = GetHighlights.getHighlights([1, 3, 5, 7], 'testtest')
  expect(result).toHaveLength(8)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItemLabel,
    childCount: 5,
  })
})

test.skip('getHighlights - highlight at start', () => {
  // @ts-ignore

  const result = GetHighlights.getHighlights([0, 2], 'test')
  expect(result).toHaveLength(4)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItemLabel,
    childCount: 2,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.QuickPickHighlight,
    childCount: 1,
  })
  expect(result[2]).toEqual({
    type: 12,
    text: 'te',
    childCount: 0,
  })
  expect(result[3]).toEqual({
    type: 12,
    text: 'st',
    childCount: 0,
  })
})

test.skip('getHighlights - highlight at end', () => {
  // @ts-ignore

  const result = GetHighlights.getHighlights([2, 4], 'test')
  expect(result).toHaveLength(4)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItemLabel,
    childCount: 2,
  })
  expect(result[1]).toEqual({
    type: 12,
    text: 'te',
    childCount: 0,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.QuickPickHighlight,
    childCount: 1,
  })
  expect(result[3]).toEqual({
    type: 12,
    text: 'st',
    childCount: 0,
  })
})
