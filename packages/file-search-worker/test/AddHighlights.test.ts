import { test, expect } from '@jest/globals'
import { addHighlights } from '../src/parts/AddHighlights/AddHighlights.ts'
import { QuickPickHighlight, QuickPickItemLabel } from '../src/parts/ClassNames/ClassNames.ts'
import { Div, Span } from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('adds no highlights when no highlights provided', () => {
  const dom: any[] = []
  addHighlights(dom, [], 'test')
  expect(dom).toEqual([
    {
      type: Div,
      className: QuickPickItemLabel,
      childCount: 1,
    },
    {
      type: 12,
      childCount: 0,
      text: 'test',
    },
  ])
})

test('adds single highlight', () => {
  const dom: any[] = []
  addHighlights(dom, [0, 4], 'test')
  expect(dom).toEqual([
    {
      type: Div,
      className: QuickPickItemLabel,
      childCount: 1,
    },
    {
      type: Span,
      className: QuickPickHighlight,
      childCount: 1,
    },
    {
      type: 12,
      childCount: 0,
      text: 'test',
    },
  ])
})

test('adds highlight with text before and after', () => {
  const dom: any[] = []
  addHighlights(dom, [1, 3], 'test')
  expect(dom).toEqual([
    {
      type: Div,
      className: QuickPickItemLabel,
      childCount: 3,
    },
    {
      type: 12,
      childCount: 0,
      text: 't',
    },
    {
      type: Span,
      className: QuickPickHighlight,
      childCount: 1,
    },
    {
      type: 12,
      childCount: 0,
      text: 'es',
    },
    {
      type: 12,
      childCount: 0,
      text: 't',
    },
  ])
})

test('adds multiple highlights', () => {
  const dom: any[] = []
  addHighlights(dom, [1, 3, 5, 7], 'testtest')
  expect(dom).toEqual([
    {
      type: Div,
      className: QuickPickItemLabel,
      childCount: 5,
    },
    {
      type: 12,
      childCount: 0,
      text: 't',
    },
    {
      type: Span,
      className: QuickPickHighlight,
      childCount: 1,
    },
    {
      type: 12,
      childCount: 0,
      text: 'es',
    },
    {
      type: 12,
      childCount: 0,
      text: 'tt',
    },
    {
      type: Span,
      className: QuickPickHighlight,
      childCount: 1,
    },
    {
      type: 12,
      childCount: 0,
      text: 'es',
    },
    {
      type: 12,
      childCount: 0,
      text: 't',
    },
  ])
})

test('adds highlights at start and end', () => {
  const dom: any[] = []
  addHighlights(dom, [0, 2, 4, 6], 'testtest')
  expect(dom).toEqual([
    {
      type: Div,
      className: QuickPickItemLabel,
      childCount: 4,
    },
    {
      type: Span,
      className: QuickPickHighlight,
      childCount: 1,
    },
    {
      type: 12,
      childCount: 0,
      text: 'te',
    },
    {
      type: 12,
      childCount: 0,
      text: 'st',
    },
    {
      type: Span,
      className: QuickPickHighlight,
      childCount: 1,
    },
    {
      type: 12,
      childCount: 0,
      text: 'te',
    },
    {
      type: 12,
      childCount: 0,
      text: 'st',
    },
  ])
})
