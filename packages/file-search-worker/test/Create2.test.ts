import { expect, test } from '@jest/globals'
import * as Create2 from '../src/parts/Create2/Create2.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as MinimumSliderSize from '../src/parts/MinimumSliderSize/MinimumSliderSize.ts'
import * as QuickPickOpenState from '../src/parts/QuickPickOpenState/QuickPickOpenState.ts'
import * as VirtualList from '../src/parts/VirtualList/VirtualList.ts'

test('create does not throw', () => {
  const uid = 123
  const uri = 'file:///test/path'
  const listItemHeight = 40
  const x = 100
  const y = 200
  const width = 800
  const height = 400
  const platform = 1
  const args = ['arg1', 'arg2']
  const workspaceUri = 'file:///workspace'

  expect(() => {
    Create2.create(uid, uri, listItemHeight, x, y, width, height, platform, args, workspaceUri)
  }).not.toThrow()
})

test('create constructs state with correct properties', () => {
  const uid = 123
  const uri = 'file:///test/path'
  const listItemHeight = 40
  const platform = 1
  const args = ['arg1', 'arg2']
  const workspaceUri = 'file:///workspace'

  const expectedVirtualList = VirtualList.create({
    headerHeight: 38,
    itemHeight: listItemHeight,
    minimumSliderSize: MinimumSliderSize.minimumSliderSize,
  })

  const expectedState = {
    cursorOffset: 0,
    height: 300,
    icons: [],
    maxVisibleItems: 10,
    picks: [],
    recentPickIds: Object.create(null),
    recentPicks: [],
    state: QuickPickOpenState.Default,
    top: 50,
    uid,
    uri,
    versionId: 0,
    warned: [],
    width: 600,
    workspaceUri,
    ...expectedVirtualList,
    args,
    fileIconCache: Object.create(null),
    focused: false,
    inputSource: InputSource.User,
    platform,
    value: '',
  }

  expect(() => {
    Create2.create(uid, uri, listItemHeight, 0, 0, 0, 0, platform, args, workspaceUri)
  }).not.toThrow()

  expect(expectedState.uid).toBe(uid)
  expect(expectedState.uri).toBe(uri)
  expect(expectedState.workspaceUri).toBe(workspaceUri)
  expect(expectedState.args).toBe(args)
  expect(expectedState.platform).toBe(platform)
  expect(expectedState.itemHeight).toBe(listItemHeight)
  expect(expectedState.headerHeight).toBe(38)
  expect(expectedState.minimumSliderSize).toBe(MinimumSliderSize.minimumSliderSize)
  expect(expectedState.inputSource).toBe(InputSource.User)
  expect(expectedState.state).toBe(QuickPickOpenState.Default)
  expect(expectedState.cursorOffset).toBe(0)
  expect(expectedState.height).toBe(300)
  expect(expectedState.width).toBe(600)
  expect(expectedState.top).toBe(50)
  expect(expectedState.focused).toBe(false)
  expect(expectedState.value).toBe('')
  expect(expectedState.picks).toEqual([])
  expect(expectedState.recentPicks).toEqual([])
  expect(expectedState.icons).toEqual([])
  expect(expectedState.warned).toEqual([])
  expect(expectedState.versionId).toBe(0)
  expect(expectedState.maxVisibleItems).toBe(10)
  expect(expectedState.fileIconCache).toEqual(Object.create(null))
  expect(expectedState.recentPickIds).toEqual(Object.create(null))
})

test('create sets virtual list properties correctly', () => {
  const uid = 456
  const listItemHeight = 50

  const expectedVirtualList = VirtualList.create({
    headerHeight: 38,
    itemHeight: listItemHeight,
    minimumSliderSize: MinimumSliderSize.minimumSliderSize,
  })

  expect(() => {
    Create2.create(uid, '', listItemHeight, 0, 0, 0, 0, 0, [], '')
  }).not.toThrow()

  expect(expectedVirtualList.itemHeight).toBe(listItemHeight)
  expect(expectedVirtualList.headerHeight).toBe(38)
  expect(expectedVirtualList.minimumSliderSize).toBe(MinimumSliderSize.minimumSliderSize)
  expect(expectedVirtualList.deltaY).toBe(0)
  expect(expectedVirtualList.finalDeltaY).toBe(0)
  expect(expectedVirtualList.focusedIndex).toBe(-1)
  expect(expectedVirtualList.items).toEqual([])
  expect(expectedVirtualList.maxLineY).toBe(0)
  expect(expectedVirtualList.minLineY).toBe(0)
  expect(expectedVirtualList.scrollBarActive).toBe(false)
  expect(expectedVirtualList.scrollBarHeight).toBe(0)
  expect(expectedVirtualList.touchDifference).toBe(0)
  expect(expectedVirtualList.touchOffsetY).toBe(0)
  expect(expectedVirtualList.touchTimeStamp).toBe(0)
})

test('create handles different parameters', () => {
  const uid1 = 789
  const uid2 = 790

  expect(() => {
    Create2.create(uid1, 'uri1', 30, 0, 0, 0, 0, 0, [], 'workspace1')
    Create2.create(uid2, 'uri2', 30, 0, 0, 0, 0, 0, [], 'workspace2')
  }).not.toThrow()
})
