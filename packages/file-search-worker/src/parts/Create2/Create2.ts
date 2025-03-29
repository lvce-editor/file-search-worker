import type { QuickPickState } from '../QuickPickState/QuickPickState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as MinimumSliderSize from '../MinimumSliderSize/MinimumSliderSize.ts'
import * as QuickPickEveryThing from '../QuickPickEntriesEverything/QuickPickEntriesEverything.ts'
import * as QuickPickOpenState from '../QuickPickOpenState/QuickPickOpenState.ts'
import * as QuickPickStates from '../QuickPickStates/QuickPickStates.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'

export const create = (
  uid: number,
  uri: string,
  listItemHeight: number,
  x: number,
  y: number,
  width: number,
  height: number,
  platform: number,
  args: any,
  renderAllItems: boolean,
): void => {
  const state: QuickPickState = {
    uid,
    state: QuickPickOpenState.Default,
    picks: [],
    recentPicks: [],
    recentPickIds: new Map(), // TODO use object.create(null) instead
    versionId: 0,
    provider: QuickPickEveryThing, // TODO make this dynamic again
    warned: [],
    visiblePicks: [],
    maxVisibleItems: 10,
    uri,
    cursorOffset: 0,
    height: 300,
    top: 50,
    width: 600,
    ...VirtualList.create({
      itemHeight: listItemHeight,
      headerHeight: 30,
      minimumSliderSize: MinimumSliderSize.minimumSliderSize,
    }),
    inputSource: InputSource.User,
    args,
    focused: false,
    platform,
    value: '',
    renderAllItems,
  }
  QuickPickStates.set(uid, state, state)
}
