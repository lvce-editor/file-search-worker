import { test, expect } from '@jest/globals'
import * as GetHighlights from '../src/parts/GetHighlights/GetHighlights.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'

test('getHighlights - empty highlights', () => {
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

test('getHighlights - single highlight', () => {
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

test('getHighlights - multiple highlights', () => {
  const result = GetHighlights.getHighlights([1, 3, 5, 7], 'testtest')
  expect(result).toHaveLength(8)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.QuickPickItemLabel,
    childCount: 5,
  })
})

test('getHighlights - highlight at start', () => {
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

test('getHighlights - highlight at end', () => {
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
